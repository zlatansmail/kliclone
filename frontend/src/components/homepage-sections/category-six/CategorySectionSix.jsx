import React from 'react'
import ArticleCard from '../../cards/article-card/ArticleCard';
import NavItem from '../../navigation/navItem/NavItem';
import './category-section-six.css';


const CategorySectionSix = (post) => {

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