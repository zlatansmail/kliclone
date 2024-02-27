import React from "react";
import '../../App.css';
import { ArticleCard } from './ArticleCard.jsx'

const FeaturedNews = ({ mostRead, newest, mostCommented }) => {
  return (
    <div className="featured-news-container">
      <div className="featured-news-wrapper">
        <div className="featured-news-buttons-wrapper">
          <div className="featured-news-button">Najnovije</div>
          <div className="featured-news-button">Najčitanije</div>
          <div className="featured-news-button">Preporuke</div>
        </div>
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
    </div>
  );
};

FeaturedNews.defaultProps = {
  mostRead: {
    // ... default mostRead article data
  },
  newest: {
    // ... default newest article data
  },
  mostCommented: {
    // ... default mostCommented article data
  },
};

export default FeaturedNews;