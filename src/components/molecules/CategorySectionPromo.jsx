import React from 'react'
import ArticleCard from '../atoms/ArticleCard';
import NavItem from '../atoms/NavItem';
import './category-section-promo.css';

const CategorySectionPromo = (props) => {

    const gridItems = [
        < NavItem />,
        <ArticleCard />,
        <ArticleCard />,
        <ArticleCard />,
        <ArticleCard />,
        <ArticleCard />,
        <ArticleCard />,
        <ArticleCard />,
        <ArticleCard />,
        <ArticleCard />
    ];

    return (
        <section className="promo-cat-section-container">
            <div className='promo-cat-grid-container'>
                {gridItems.map((item, index) => (
                    <div key={index} className="promo-grid-item">
                        {item}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategorySectionPromo;