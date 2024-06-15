import React from "react";

import "./suggested-news.css";

import ArticleCard from "../article-card/ArticleCard.jsx";

const SuggestedNews = ({ header, postsData = [], currentPostSlug }) => {
  return (
    <div>
      <h2>{header}</h2>
      <div className="suggested-news-wrapper">
        {postsData
          .filter((item) => item.slug !== currentPostSlug)
          .slice(0, 5)
          .map((post) => {
            return (
              <ArticleCard
                key={post._id}
                    title={post.title}
                    captionColor={post.categories[0]?.color || "rgb(250, 0, 0)"}
                    caption={post.caption}
                    createdAt={post.createdAt}
                    sharesNo={post.sharesNo}
                    slug={post.slug}
                    post={post}
                    commentsNo={post.comments.length}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SuggestedNews;
