import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import "./App.css";
import ArticlePage from "./components/pages/articlePage/ArticlePage.jsx";
import Homepage from './components/pages/homepage/Homepage.jsx';
import Navigation from "./components/navigation/Navigation.jsx";
import DropdownMenu from "./components/navigation/dropdown-menu/DropdownMenu.jsx";
import RegisterPage from "./components/users/register/RegisterPage.jsx";
import LoginPage from "./components/users/login/LoginPage.jsx";
import ProfilePage from "./components/users/profile/ProfilePage.jsx";

const App = () => {

  return (
    <>
      <Routes>
        <Route index path="/" element={<Homepage />} />
        <Route path="/clanak/:slug" element={<ArticlePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
