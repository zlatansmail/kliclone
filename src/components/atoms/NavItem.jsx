import React from "react";
import '../../App.css';
import './nav-item.css';

const NavItem = ({ content, link, boxColor, fontColor }) => {
  return (
    <div className="nav-item">
      <a href={link} style={{ color: fontColor }}>
        <span className="nav-item-icon-box" style={{ backgroundColor: boxColor }}></span>
        <p className="nav-content">{content}</p>
      </a>
    </div>
  );
};

export default NavItem;