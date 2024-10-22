import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import HomeContent from "./HomeContent";
import groups from "../utils/tags.json";
import priorityMapping from "../utils/priority.json";
import { convertToCamelCase, cretateInitialsFromName } from "../utils/helper";
import Loader from "./Loader";
import "./../css/home.css";

export default function Home() {
  const [grouping, setGrouping] = useState(
    localStorage.getItem("grouping") || "status"
  );
  const [ordering, setOrdering] = useState(
    localStorage.getItem("ordering") || "priority"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState(groups);
  const [users, setUsers] = useState([]);
  
  const url = "https://api.quicksell.co/v1/internal/frontend-assignment";

  const fetchInfo = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      
      data.users.forEach((el) => {
        const initials = cretateInitialsFromName(el["name"]);
        setUsers((prv) => {
          return {
            ...prv,
            [el.id]: { ...el, initials },
          };
        });
      });
      
      data.tickets.forEach((el) => {
        el.status = convertToCamelCase(el.status);
        setTags((prev) => {
          return {
            status: {
              ...prev.status,
              [el.status]: (prev.status[el.status] || []).concat(el),
            },
            priority: {
              ...prev.priority,
              [priorityMapping[el.priority]]: (
                prev.priority[priorityMapping[el.priority]] || []
              ).concat(el),
            },
            user: {
              ...prev.user,
              [el.userId]: (prev.user[el.userId] || []).concat(el),
            },
          };
        });
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      alert(`Oops! An error occurred while loading the data. ${error.message}`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
    return () => {
      setTags(groups);
      setUsers([]);
    };
  }, []);
  return (
    <div className="home-container">
      <div className="header">
        <Dropdown
          setGrouping={setGrouping}
          setOrdering={setOrdering}
          grouping={grouping}
          ordering={ordering}
        />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <HomeContent
          grouping={grouping}
          ordering={ordering}
          data={tags}
          users={users}
        />
      )}
    </div>
  );
}
