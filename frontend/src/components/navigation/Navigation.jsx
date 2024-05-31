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

const Navigation = ({ isDropDownOpen, handleDropDownClick }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);

  const [profileDropdown, setProfileDropdown] = useState(false);

  const handleClick = () => {
    handleDropDownClick();
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="navigation-wrapper">
      <div className="nav-items-wrapper">
        <div className="logo-wrapper">
          <Link to="/">
            <img className="nav-logo" src="/logo.svg" alt="klix logotip" />
          </Link>
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
              profileDropdown ? "profile-dropdown" : "profile-dropdown-closed"
            }`}
          >
            <ul>
              {userState.userInfo ? (
                <>
                  <li onClick={logoutHandler}>Odjavite se</li>
                  <li onClick={() => navigate("/profile")}>Moj Profil</li>
                </>
              ) : (
                <>
                  <li onClick={() => navigate("/login")}>Prijavite se</li>
                  <li onClick={() => navigate("/register")}>Registrujte se</li>
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
    </header>
  );
};

export default Navigation;
