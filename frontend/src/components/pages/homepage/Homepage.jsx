import React from "react";

import MainLayout from "../../MainLayout.jsx";
import HeroSection from "../../homepage-sections/hero-section/HeroSection.jsx";
import CategorySectionSix from "../../homepage-sections/category-six/CategorySectionSix.jsx";
import CategorySectionFour from "../../homepage-sections/category-four/CategorySectionFour.jsx";
import CategorySectionPromo from "../../homepage-sections/category-promo/CategorySectionPromo.jsx";
import "./homepage.css";

const Homepage = () => {
  return (
    <MainLayout>
      <div className="homepage">
        <div className="home-body">
          <HeroSection />
          <CategorySectionSix />
          <CategorySectionSix />
          <CategorySectionSix />
          <CategorySectionSix />
          <CategorySectionSix />
          <CategorySectionFour />
          <CategorySectionFour />
          <CategorySectionPromo />
        </div>
      </div>
    </MainLayout>
  );
};

export default Homepage;
