import React from "react";
import '../../App.css';
import './right-menu.css'

const RightMenu = ({ handleDropDownClick, isDropDownOpen }) => {

  const svgClosed = (
    <svg
      className="ham-menu-icon-svg closed"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
      />
    </svg>
  );

  const svgOpen = (
    <svg
      className="ham-menu-icon-svg open"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
      />
    </svg>
  );

  const handleClick = () => {
    handleDropDownClick();
  };

  return (
    <div className="right-menu-wrapper">
      <span className="search-icon-wrapper">
        <svg
          className="search-icon-svg"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
      </span>
      <span className="profile-icon-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      </span>
      <span className="ham-menu-icon-wrapper" onClick={handleClick}>
        {isDropDownOpen ? svgOpen : svgClosed}
      </span>
    </div>
  );
};

export default RightMenu;
