import React from "react";
import { useState } from "react";

import DropdownMenu from "./navigation/dropdown-menu/DropdownMenu";
import Navigation from "./navigation/Navigation";
import Footer from "./common/footer/Footer";

const MainLayout = ({ children }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleDropDownClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  return (
    <div>
      <Navigation
        handleDropDownClick={handleDropDownClick}
        isDropDownOpen={isDropDownOpen}
      />
      {isDropDownOpen && <DropdownMenu />}
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
