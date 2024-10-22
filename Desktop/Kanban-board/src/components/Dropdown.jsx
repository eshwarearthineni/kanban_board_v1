import React, { useState, useEffect, useRef } from 'react';
import './../css/dropdown.css';
/**
 * Dropdown Component
 * @param {object} props 
 * @returns {React.node} 
 */
function Dropdown(props) {
    const [isActive, setIsActive] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsActive(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const onClick = () => setIsActive(!isActive);

    const { setGrouping, setOrdering, grouping, ordering } = props;

    return (
        <div className='container'>
            <div className='menu-container'>
                <button
                    onClick={onClick}
                    className='menu-trigger'
                    type='button'
                >
                    {' '}
                    <img
                        src={process.env.PUBLIC_URL + '/assets/Display.svg'}
                        alt='altImg'
                    />{' '}
                    Display
                    <img
                        className={`dropDownArrow ${isActive ? 'close' : ''}`}
                        src='https://img.icons8.com/ios-glyphs/30/expand-arrow--v1.png'
                        alt='expand-arrow--v1'
                    />
                </button>
                <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
                    <ul>
                        <li>
                            <div className='filter-option'>
                                <p>Grouping</p>
                                <select
                                    name='groupBy'
                                    id='grouping'
                                    onChange={(e) => {
                                        localStorage.setItem(
                                            'grouping',
                                            e.target.value
                                        );
                                        setGrouping(e.target.value);
                                    }}
                                    value={grouping}
                                >
                                    <option value='status'>Status</option>
                                    <option value='user'>User</option>
                                    <option value='priority'>Priority</option>
                                </select>
                            </div>
                        </li>
                        <li>
                            <div className='filter-option'>
                                <p>Ordering</p>
                                <select
                                    name='orderBy'
                                    id='ordering'
                                    onChange={(e) => {
                                        localStorage.setItem(
                                            'ordering',
                                            e.target.value
                                        );
                                        setOrdering(e.target.value);
                                    }}
                                    value={ordering}
                                >
                                    <option value='priority'>Priority</option>
                                    <option value='title'>Title</option>
                                </select>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Dropdown;
