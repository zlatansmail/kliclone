import React from "react";
import { NavLink } from "react-router-dom";
import "./nav-item.css";

const NavItem = ({
  link,
  title,
  icon,
  name,
  activeNavName,
  setActiveNavName
}) => {
  return (
    <NavLink
      to={link}
      className="dash-nav-item"
      onClick={() => setActiveNavName(name)}
    >
      {icon}
      {title}
    </NavLink>
  );
};

export default NavItem;
