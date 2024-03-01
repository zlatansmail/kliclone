import React from 'react'
import ArticleCard from '../atoms/ArticleCard';
import NavItem from '../atoms/NavItem';

const CategorySectionFour = (props) => {

    const gridItems = [
        <NavItem />,
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