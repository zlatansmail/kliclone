import React from "react";
import '../App.css';

const NavItem = ({ content, link, navItemBgColor }) => {
    if (content === 'Vijesti') {
        navItemBgColor = 'rgba(211,61,61,1)';
    } else if (content === 'Biznis') {
        navItemBgColor = 'rgba(239,111,62,1)';
    } else if (content === 'Sport') {
        navItemBgColor = 'rgba(85,172,83,1)';
    } else if (content === 'Magazin') {
        navItemBgColor = 'rgba(164,80,145,1)';
    } else if (content === 'Lifestyle') {
        navItemBgColor = 'rgba(226,166,0,1)';
    } else if (content === 'Scitech') {
        navItemBgColor = 'rgba(64,175,238,1)';
    } else if (content === 'Auto') {
        navItemBgColor = 'rgba(72,123,175,1)';
    } else if (content === 'Križaljka') {
        navItemBgColor = 'rgba(156,163,175,1)';
    } else if (content === 'Posao') {
        navItemBgColor = 'rgba(233,30,99,1)';
    } else if (content === 'Forum') {
        navItemBgColor = 'rgba(156,163,175,1)';
    } else {
        navItemBgColor= 'rgba(156,163,175,1)';
    }

  return (
    <div className="nav-item">
      <a href={link}>
        <span
          className='nav-item-icon-box'
          style={{ backgroundColor: navItemBgColor }}
        ></span>
        <p className='nav-content'>{content}</p>
      </a>
    </div>
  );
};

export default NavItem;