import React from "react";

import "./suggested-news.css";

import ArticleCard from "../article-card/ArticleCard.jsx";

const SuggestedNews = ({ header, postsData = [] }) => {
  console.log(postsData);
  return (
    <div>
      <h2>{header}</h2>
      <div className="suggested-news-wrapper">
        {postsData.slice(0, 5).map((item) => {
          return (
            <ArticleCard
              key={item._id}
              title={item.title}
              caption={item.caption}
              createdAt={item.createdAt}
              sharesNo={item.sharesNo}
              comments={item.comments}
              slug={item.slug}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SuggestedNews;
