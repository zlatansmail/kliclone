import React from "react";
import './navigation.css';
import NavItem from "../atoms/NavItem";
import RightMenu from "../atoms/RightMenu";
import ThemeToggle from "../atoms/ThemeToggle";
import { navItems } from '../../objects/navItems'


const Navigation = ({ isDropDownOpen, handleDropDownClick }) => {

  const handleClick = () => {
    handleDropDownClick();
  };

  return (
    <div className="navigation-wrapper">
      <div className="nav-items-wrapper">
        <div className="logo-wrapper">
          <img className="nav-logo" src="logo.svg" alt="klix logotip" />
        </div>
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            content={item.content}
            link={`/${item.content.toLowerCase()}`}
            boxColor={item.boxColor}
            fontColor={item.fontColor}
          />
        ))}
        <ThemeToggle />
      </div>
      <RightMenu handleDropDownClick={handleClick} isDropDownOpen={isDropDownOpen} />

    </div>
  );
};

export default Navigation;