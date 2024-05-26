import React, { useState } from "react";
import { categories } from "../../objects/categories";
import './dropdown-menu.css';

const DropdownMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const defaultSubcategoryColor = 'rgb(75,85,99)'

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const renderSubcategory = (subcategory) => {
    return (
      <li key={subcategory.id} className="subcategory-item">
        <span
          style={{
            backgroundColor: defaultSubcategoryColor
          }}
          className="category-square"
        ></span>
        <a href="#">{subcategory.name}</a>
      </li>
    );
  };

  const renderCategory = (category) => {
    return (
      <li key={category.id} className="category-list">
        <div className="category-list-heading">
          <span style={{ backgroundColor: category.color }} className="category-square"></span>
          <a href="#" onClick={() => handleCategoryClick(category)}>
            {category.name}
          </a>
        </div>
        {category.subcategories && (
          <ul className="subcategories-list">
            {category.subcategories.map(renderSubcategory)}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="dropdown-menu">
      <div className="dropdown-items-wrapper">
        <ul className="dropdown-grid">
          {categories.map(renderCategory)}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
