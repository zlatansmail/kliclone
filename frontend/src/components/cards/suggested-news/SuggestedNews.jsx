import React from "react";

import "./suggested-news.css";

import ArticleCard from "../article-card/ArticleCard.jsx";

const SuggestedNews = ({ header, postsData = [] }) => {
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
              commentNo={item.commentNo}
              slug={item.slug}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SuggestedNews;

/* <div className="suggested-news-item" key={postsData._id}>
          <div className="suggested-news-item-image">
            <img
              src={
                postsData?.photo
                  ? stables.UPLOAD_FOLDER_BASE_URL + postsData?.photo
                  : images.samplePostImage
              }
              alt={postsData?.title}
            />
          </div>
          <div className="suggested-news-item-text">
            <div className="suggested-news-item-title">{postsData.title}</div>
            <div className="suggested-news-item-date">{postsData.createdAt}</div>
          </div>
        </div> */
