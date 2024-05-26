import React from 'react'
import ArticleCard from '../atoms/ArticleCard';
import NavItem from '../atoms/NavItem';
import './category-section-six.css';


const CategorySectionSix = (props) => {

  const gridItems = [
    <NavItem />,
    <ArticleCard />,
    <ArticleCard />,
    <ArticleCard />,
    <ArticleCard />,
    <ArticleCard />,
    <ArticleCard />
  ];

  return (
    <section className="cat-six-section-container">
      <div className='cat-six-grid-container'>
        {gridItems.map((item, index) => (
          <div key={index} className="cat-six-grid-item">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySectionSix;