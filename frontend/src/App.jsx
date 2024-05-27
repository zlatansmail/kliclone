import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

import ArticlePage from './components/templates/articlePage/ArticlePage.jsx';
import Homepage from './components/templates/homepage/Homepage.jsx';
import Navigation from './components/molecules/Navigation.jsx';
import DropdownMenu from './components/molecules/DropdownMenu.jsx';
import RegisterPage from './components/templates/register/RegisterPage.jsx';
import LoginPage from './components/templates/login/LoginPage.jsx';



const App = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleDropDownClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  }
  return (
    <>
    <BrowserRouter>
    <header className="header">
        <Navigation handleDropDownClick={handleDropDownClick} isDropDownOpen={isDropDownOpen} />
        {isDropDownOpen && <DropdownMenu />}
      </header>
      
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/article-name" element={<ArticlePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
