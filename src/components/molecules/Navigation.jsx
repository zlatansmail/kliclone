import React from "react";
import '../../App.css';
import NavItem from "../atoms/NavItem";
import SideMenu from "../atoms/SideMenu";
import ThemeToggle from "../atoms/ThemeToggle";
import { navItems } from '../../objects/navItems'
const Navigation = () => {


  return (
    <div className="navigation-wrapper">
      <div className="nav-items-wrapper">
        <div className="logo-wrapper">
          <img id="logo" src="logo.svg" alt="klix logotip" />
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
      <SideMenu />
    </div>
  );
};

export default Navigation;