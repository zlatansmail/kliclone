import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { MdArticle } from "react-icons/md";
import { FaComments, FaUser } from "react-icons/fa";
import { useWindowSize } from "@uidotdev/usehooks";

import images from "../../../../../constants/images";
import "./header.css";
import NavItem from "./nav-item/nav-item/NavItem";
import NavItemCollapse from "./nav-item/nav-item-collapse/NavItemCollapse";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { createPost } from "../../../../../services/index/posts";

const Header = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");
  const windowSize = useWindowSize();

  const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } =
    useMutation(
      ({ token, slug }) =>
        createPost({
          token
        }),
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["posts"]);
          toast.success("Clanak je kreiran!");
          navigate(`/dashboard/articles/manage/edit/${data.slug}`);
        },
        onError: (error) => {
          toast.error(error.message);
          console.log(error);
        }
      }
    );

  const toggleMenuHandler = () => {
    setIsMenuActive(!isMenuActive);
  };

  useEffect(() => {
    if (windowSize.width > 1024) {
      setIsMenuActive(true);
    }
  }, [windowSize.width]);

  const handleCreateNewPost = ({ token }) => {
    mutateCreatePost({ token });
  };

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
            <NavItem
              title="Dashboard"
              link="/dashboard"
              icon={<AiFillDashboard />}
              name="dashboard"
              activeNavName={activeNavName}
              setActiveNavName={setActiveNavName}
            />
            <NavItem
              title="Komentari"
              link="/dashboard/comments"
              icon={<FaComments />}
              name="comments"
              activeNavName={activeNavName}
              setActiveNavName={setActiveNavName}
            />
            <NavItem
              title="Korisnici"
              link="/dashboard/users"
              icon={<FaUser />}
              name="users"
              activeNavName={activeNavName}
              setActiveNavName={setActiveNavName}
            />
            <NavItemCollapse
              title="Clanci"
              icon={<MdArticle />}
              name="articles"
              activeNavName={activeNavName}
              setActiveNavName={setActiveNavName}
            >
              <Link
                to="/dashboard/articles/manage"
                className="dropdown-nav-item"
              >
                Upravljaj clancima
              </Link>
              <Link
                to="/dashboard/categories/manage"
                className="dropdown-nav-item"
              >
                Kategorije
              </Link>
              <button
                disabled={isLoadingCreatePost}
                onClick={() =>
                  handleCreateNewPost({
                    token: userState.userInfo.token
                  })
                }
                className="dropdown-nav-item"
              >
                Dodaj novi clanak
              </button>
            </NavItemCollapse>
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
                  <NavItem
                    title="Dashboard"
                    link="/dashboard"
                    icon={<AiFillDashboard />}
                    name="dashboard"
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                  />
                  <NavItem
                    title="Komentari"
                    link="/dashboard/comments"
                    icon={<FaComments />}
                    name="comments"
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                  />
                  <NavItem
                    title="Korisnici"
                    link="/dashboard/users"
                    icon={<FaUser />}
                    name="users"
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                  />
                  <NavItemCollapse
                    title="Clanci"
                    icon={<MdArticle />}
                    name="articles"
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                  >
                    <Link
                      to="/dashboard/articles/manage"
                      className="dropdown-nav-item"
                    >
                      Upravljaj clancima
                    </Link>
                    <Link
                      to="/dashboard/categories/manage"
                      className="dropdown-nav-item"
                    >
                      Kategorije
                    </Link>
                    <button
                      disabled={isLoadingCreatePost}
                      onClick={() =>
                        handleCreateNewPost({
                          token: userState.userInfo.token
                        })
                      }
                      className="dropdown-nav-item"
                    >
                      Dodaj novi clanak
                    </button>
                  </NavItemCollapse>
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
