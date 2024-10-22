import React from 'react';

import Card from './Card';
import imageMapping from './../utils/images.json';
import colorMapping from './../utils/colors.json';
/**
 * HomeContentColumn Component
 * @param {object} props 
 * @returns {React.node} 
 */
export default function HomeContentColumn(props) {
	const { data, heading, grouping, users, ordering } = props;
	return (
		<div className='home-content-column'>
			<div className='home-content-column-header'>
				<div className='home-content-column-header-title'>
					{grouping !== 'user' ? (
						<div className='img-container'>
							<img
								className='home-content-column-tag-icon'
								src={
									process.env.PUBLIC_URL +
									`/assets/${imageMapping[heading]}`
								}
								alt='test'
							/>
						</div>
					) : (
						<div className='column-card-profile'>
							{users[heading].imgUrl ? (
								<img
									src={users[heading].imgUrl}
									alt='img'
									className='user'
								/>
							) : (
								<div
									className='profile-img-initials user'
									style={{
										color: colorMapping[
											users[heading].initials[0]
										].text,
										backgroundColor:
											colorMapping[
												users[heading].initials[0]
											].background,
									}}
								>
									{users[heading].initials}
								</div>
							)}

							<span
								className={
									'user-activity' +
									(users[heading].available
										? ' online'
										: ' offline')
								}
							></span>
						</div>
					)}
					{grouping !== 'user' ? heading : users[heading].name}
					<span className='home-content-column-count'>
						{data.length}
					</span>
				</div>
				<div className='home-content-column-header-right'>
					<img
						className='home-content-column-header-more'
						src={process.env.PUBLIC_URL + '/assets/add.svg'}
						alt='+'
					/>
					<img
						className='home-content-column-header-more'
						src={process.env.PUBLIC_URL + '/assets/menu.svg'}
						alt='...'
					/>
				</div>
			</div>

			<div className='home-content-column-body'>
				{data?.sort((a, b) => {
						if(ordering === 'priority') {
							return b.priority - a.priority;
						}
						if(a.title < b.title) { return -1; }
						if(a.title > b.title) { return 1; }
						return 0;
					}).map((el, idx) => {
					return (
						<Card
							key={idx}
							data={el}
							grouping={grouping}
							users={users}
						/>
					);
				})}
			</div>
		</div>
	);
}
