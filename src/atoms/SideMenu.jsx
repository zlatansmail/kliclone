import React from "react";
import '../App.css';

const SideMenu = () => {
    return (
        <div className="side-menu-wrapper">
            <span className="search-icon-wrapper">
                <button id="search-button">
                    <svg
                        className="search-icon-svg"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        strokeWidth="1.5"
                        fill="none"
                        stroke="currentColor">
                        <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z">
                        </path>
                    </svg>
                </button>
            </span>
            <span className="profile-icon-wrapper">

            </span>
            <span className="ham-menu-icon-wrapper">

            </span>
        </div>
    );
};

export default SideMenu;