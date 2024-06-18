import React, { useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { NavLink } from "react-router-dom";

const NavItemCollapse = ({
  title,
  children,
  icon,
  name,
  activeNavName,
  setActiveNavName
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div
        className="dash-nav-item"
        onChange={() => {
          setActiveNavName(activeNavName);
        }}
        onClick={toggleHandler}
      >
        {icon}
        {title}
        <MdOutlineArrowDropDown />
      </div>
      {isOpen && (
        <div className="dropdown-nav-items" 
        onClick={toggleHandler}>
            {children}
        </div>
      )}
    </div>
  );
};

export default NavItemCollapse;
