import React from "react";
import '../App.css';
import NavItem from "../atoms/NavItem";
import SideMenu from "../atoms/SideMenu";
import ThemeToggle from "../atoms/ThemeToggle";

const Navigation = () => {
  const navItems = [
    { id: '1', content: 'Vijesti', boxColor: "rgba(211,61,61,1)", fontColor: 'inherit' },
    { id: '2', content: 'Biznis', boxColor: "rgba(239,111,62,1)", fontColor: 'inherit' },
    { id: '3', content: 'Sport', boxColor: "rgba(85,172,83,1)", fontColor: 'inherit' },
    { id: '4', content: 'Magazin', boxColor: "rgba(164,80,145,1)", fontColor: 'inherit' },
    { id: '5', content: 'Lifestyle', boxColor: "rgba(226,166,0,1)", fontColor: 'inherit' },
    { id: '6', content: 'Scitech', boxColor: "rgba(64,175,238,1)", fontColor: 'inherit' },
    { id: '7', content: 'Auto', boxColor: "rgba(72,123,175,1)", fontColor: 'inherit' },
    { id: '8', content: 'Križaljka', boxColor: "rgba(156,163,175,1)", fontColor: 'inherit' },
    { id: '9', content: 'Posao', boxColor: "rgba(233,30,99,1)", fontColor: 'rgba(233,30,99,1)' },
    { id: '10', content: 'Forum', boxColor: "rgba(156,163,175,1)", fontColor: 'inherit' },
  ];

  return (
    <div className="navigation-wrapper">
      <div className="nav-items-wrapper">
        <div className="logo-wrapper">
          <img id="logo" src="logo.png" alt="klix logotip" />
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