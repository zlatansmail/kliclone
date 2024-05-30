import React from 'react';

import HeroSection from '../../homepage-sections/hero-section/HeroSection.jsx';
import CategorySectionSix from '../../homepage-sections/category-six/CategorySectionSix.jsx';
import CategorySectionFour from '../../homepage-sections/category-four/CategorySectionFour.jsx';
import CategorySectionPromo from '../../homepage-sections/category-promo/CategorySectionPromo.jsx';
import Footer from '../../common/footer/Footer.jsx';
import './homepage.css';

const Homepage = () => {

  return (
    <div className="homepage">
      <div className='bellow-header'></div>
      <div className='home-body'>
      <HeroSection />
      <CategorySectionSix />
      <CategorySectionSix />
      <CategorySectionSix />
      <CategorySectionSix />
      <CategorySectionSix />
      <CategorySectionFour />
      <CategorySectionFour />
      <CategorySectionPromo />
      <Footer />
      </div>
    </div>
  );
}

export default Homepage;
