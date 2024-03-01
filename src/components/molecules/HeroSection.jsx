import React from "react";
import '../../App.css';
import ArticleCard from '../../components/atoms/ArticleCard'
import HashtagSlider from "../../components/atoms/HashtagSlider";
import FeaturedNews from "../../components/atoms/FeaturedNews";

const HeroSection = (props) => {
  const gridItems = [
    <HashtagSlider />,
    <ArticleCard />,
    <ArticleCard />,
    <ArticleCard />,
    <FeaturedNews />,
    <ArticleCard />,
    <ArticleCard />,
    <ArticleCard />,
    <ArticleCard />,

  ];

  return (
    <div>
      <section className="hero-section-container">
        <div className="hero-grid-container">
          {gridItems.map((item, index) => (
            <div key={index} className="grid-item">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HeroSection;