import React from "react";
import './home-body.css';
import HeroSection from "../molecules/HeroSection";
import CategorySectionSix from "../molecules/CategorySectionSix";
import CategorySectionFour from "../molecules/CategorySectionFour";
import CategorySectionPromo from "../molecules/CategorySectionPromo";

const HomeBody = () => {
  return (
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
  );
};

export default HomeBody;