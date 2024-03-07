import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

import ArticlePage from './components/templates/ArticlePage.jsx';
import Homepage from './components/templates/Homepage.jsx';
import Navigation from './components/molecules/Navigation.jsx';
import DropdownMenu from './components/molecules/DropdownMenu.jsx';
const App = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleDropDownClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  }
  return (
    <>
      <header className="header">
        <Navigation handleDropDownClick={handleDropDownClick} isDropDownOpen={isDropDownOpen} />
        {isDropDownOpen && <DropdownMenu />}
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/article-name" element={<ArticlePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
