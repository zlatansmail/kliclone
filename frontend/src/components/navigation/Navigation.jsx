import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

import "./navigation.css";
import NavItem from "./navItem/NavItem";
import { navItems } from "../../objects/navItems";
import { logout } from "../../store/actions/user";
import useWindowDimensions from "../../hooks/useWindowDimension";

const Navigation = ({ isDropDownOpen, handleDropDownClick }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);

  const [profileDropdown, setProfileDropdown] = useState(false);

  const { width, height } = useWindowDimensions();

  const displayedNavItems = width < 1274 ? navItems.slice(0, -3) : navItems;
  const isMobile = width < 1274;

  const handleClick = () => {
    handleDropDownClick();
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      {isMobile ? (
        <div className="navigation-wrapper">
          <div className="mobile-header-left">
            <div className="ham-menu-icon-wrapper" onClick={handleClick}>
              {isDropDownOpen ? (
                <IoClose className="ham-menu-icon" />
              ) : (
                <RxHamburgerMenu className="ham-menu-icon" />
              )}
            </div>
          </div>
          <div className="mobile-header-center">
            <Link to="/">
              <img className="nav-logo" src="/logo.svg" alt="klix logotip" />
            </Link>
          </div>
          <div className="mobile-header-right">
            <div className="search-icon-wrapper">
              <CiSearch className="search-icon" />
            </div>
            <div
              className="profile-icon-wrapper"
              onClick={() => setProfileDropdown(!profileDropdown)}
            >
              <CgProfile className="profile-icon" />
              <div
                className={`${
                  profileDropdown
                    ? "profile-dropdown"
                    : "profile-dropdown-closed"
                }`}
              >
                <ul>
                  {userState.userInfo ? (
                    <>
                      {userState?.userInfo?.admin && (
                        <li onClick={() => navigate("/dashboard")}>
                          Admin Dashboard
                        </li>
                      )}
                      <li onClick={logoutHandler}>Odjavite se</li>
                      <li onClick={() => navigate("/profile")}>Moj Profil</li>
                    </>
                  ) : (
                    <>
                      <li onClick={() => navigate("/login")}>Prijavite se</li>
                      <li onClick={() => navigate("/register")}>
                        Registrujte se
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="navigation-wrapper">
          <div className="nav-items-wrapper">
            <div className="logo-wrapper">
              <Link to="/">
                <img className="nav-logo" src="/logo.svg" alt="klix logotip" />
              </Link>
            </div>
            {displayedNavItems.map((item) => (
              <NavItem
                key={item.id}
                content={item.content}
                link={`/${item.content.toLowerCase()}`}
                boxColor={item.boxColor}
                fontColor={item.fontColor}
              />
            ))}
          </div>
          <div className="right-menu-wrapper">
            <div className="search-icon-wrapper">
              <CiSearch className="search-icon" />
            </div>
            <div
              className="profile-icon-wrapper"
              onClick={() => setProfileDropdown(!profileDropdown)}
            >
              <CgProfile className="profile-icon" />
              <div
                className={`${
                  profileDropdown
                    ? "profile-dropdown"
                    : "profile-dropdown-closed"
                }`}
              >
                <ul>
                  {userState.userInfo ? (
                    <>
                      {userState?.userInfo?.admin && (
                        <li onClick={() => navigate("/dashboard")}>
                          Admin Dashboard
                        </li>
                      )}
                      <li onClick={logoutHandler}>Odjavite se</li>
                      <li onClick={() => navigate("/profile")}>Moj Profil</li>
                    </>
                  ) : (
                    <>
                      <li onClick={() => navigate("/login")}>Prijavite se</li>
                      <li onClick={() => navigate("/register")}>
                        Registrujte se
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <div className="ham-menu-icon-wrapper" onClick={handleClick}>
              {isDropDownOpen ? (
                <IoClose className="ham-menu-icon" />
              ) : (
                <RxHamburgerMenu className="ham-menu-icon" />
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
