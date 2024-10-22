import React from "react";
import imageMapping from "./../utils/images.json";
import priorityMapping from "./../utils/priority.json";
import colorMapping from "./../utils/colors.json";
import "./../css/card.css";
/**
 * Card Component
 * @param {object} props 
 * @returns {React.node} 
 */

export default function Card(props) {
  const { data, grouping, users } = props;
  return (
    <div className="card-container">
      <div className="card-header">
        <p className="card-id">{data.id}</p>
        <div className={`card-profile ${grouping === "user" ? "hidden" : ""}`}>
          {users[data.userId].imgUrl ? (
            <img src={users[data.userId].imgUrl} alt="img" className="user" />
          ) : (
            <div
              className="profile-img-initials user"
              style={{
                color: colorMapping[users[data.userId].initials[0]].text,
                backgroundColor:
                  colorMapping[users[data.userId].initials[0]].background,
              }}
            >
              {users[data.userId].initials}
            </div>
          )}

          <span
            className={
              "user-activity" +
              (users[data.userId].available ? " online" : " offline")
            }
          ></span>
        </div>
      </div>
      <div className="card-title-parent">
        <img
          className={`card-progress-point home-content-column-tag-icon  ${
            grouping === "status" ? "hidden" : ""
          }`}
          src={process.env.PUBLIC_URL + `/assets/${imageMapping[data.status]}`}
          alt="test"
        />
        <p className="card-title">{data.title}</p>
      </div>
      <div className="card-footer">
        <div className={`priority ${grouping === "priority" ? "hidden" : ""}`}>
          <div className="priority-shape ">
            <img
              src={
                process.env.PUBLIC_URL +
                `/assets/${imageMapping[priorityMapping[data.priority]]}`
              }
              alt="logo"
            />
          </div>
        </div>
        {data["tag"].map((el, idx) => {
          return (
            <div key={idx} className="card-tag">
              <span className="tag-point"></span>
              {el}
            </div>
          );
        })}
      </div>
    </div>
  );
}
