import React from 'react'
import ArticleCard from '../../cards/article-card/ArticleCard';
import NavItem from '../../navigation/navItem/NavItem';
import { categories } from '../../../objects/categories';
import './category-section-four.css';

const CategorySectionFour = (props) => {

    const gridItems = [
        <NavItem key={categories.id} content={categories.name} />,
        <ArticleCard />,
        <ArticleCard />,
        <ArticleCard />,
        <ArticleCard />
    ];

    return (
        <section className="cat-four-section-container">
            <div className='cat-four-grid-container'>
                {gridItems.map((item, index) => (
                    <div key={index} className="cat-four-grid-item">
                        {item}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategorySectionFour;