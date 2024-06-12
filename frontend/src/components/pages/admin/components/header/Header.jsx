import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { MdArticle, MdElectricBike } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import { useWindowSize } from "@uidotdev/usehooks";

import images from "../../../../../constants/images";
import "./header.css";
import NavItem from "./nav-item/nav-item/NavItem";
import NavItemCollapse from "./nav-item/nav-item-collapse/NavItemCollapse";

const menuItems = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: <AiFillDashboard />,
    name: "dashboard",
    type: "link"
  },
  {
    title: "Komentari",
    link: "/dashboard/comments",
    icon: <FaComments />,
    name: "comments",
    type: "link"
  },
  {
    title: "Članci",
    content: [
      {
        title: "Dodaj članak",
        link: "/dashboard/articles/new"
      },
      {
        title: "Svi članci",
        link: "/dashboard/articles/manage"
      }
    ],
    icon: <MdArticle />,
    name: "articles",
    type: "collapse"
  }
];

const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");
  const windowSize = useWindowSize();

  const toggleMenuHandler = () => {
    setIsMenuActive(!isMenuActive);
  };

  useEffect(() => {
    if (windowSize.width > 1024) {
      setIsMenuActive(true);
    }
  }, [windowSize.width]);

  return (
    <>
      <header className="header-wrapper">
        <div className="logo-wrapper">
          <Link to="/">
            <img src={images.Logo} className="logo" alt="logo" />
          </Link>
        </div>
        {windowSize.width > 1024 && (
            <div className="menu">
              {menuItems.map((item) =>
                item.type === "link" ? (
                  <NavItem
                    key={item.title}
                    title={item.title}
                    link={item.link}
                    icon={item.icon}
                    name={item.name}
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                  />
                ) : (
                  <NavItemCollapse
                    key={item.title}
                    title={item.title}
                    content={item.content}
                    icon={item.icon}
                    name={item.name}
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                  />
                )
              )}
            </div>
          )}
        <div className="menu-icon-wrapper">
          {isMenuActive ? (
            <AiOutlineClose className="menu-icon" onClick={toggleMenuHandler} />
          ) : (
            <AiOutlineMenu className="menu-icon" onClick={toggleMenuHandler} />
          )}
        </div>
      </header>
      {isMenuActive && (
        <div>
          {/* underlay */}
          <div className="underlay">
            {/* sidebar */}
            <div className="sidebar">
              <div className="sidebar-inner">
                <Link to="/">
                  <img src={images.Logo} className="sidebar-logo" alt="logo" />
                </Link>
                <h4 className="menu-title">Meni</h4>
                {/* menu items */}
                <div className="menu">
                  {menuItems.map((item) =>
                    item.type === "link" ? (
                      <NavItem
                        key={item.title}
                        title={item.title}
                        link={item.link}
                        icon={item.icon}
                        name={item.name}
                        activeNavName={activeNavName}
                        setActiveNavName={setActiveNavName}
                      />
                    ) : (
                      <NavItemCollapse
                        key={item.title}
                        title={item.title}
                        content={item.content}
                        icon={item.icon}
                        name={item.name}
                        activeNavName={activeNavName}
                        setActiveNavName={setActiveNavName}
                      />
                    )
                  )}
                  <div onClick={toggleMenuHandler} className="dash-nav-item">
                    <AiOutlineClose /> Zatvori
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
