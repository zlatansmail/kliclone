import React from "react";

import "./article-card.css";
import { categoryColors } from "../../../objects/categoryColors.js";
import stables from "../../../constants/stables.js";



export const ArticleCard = ({
  categories,
  title,
  caption,
  photo,
  createdAt,
  sharesNo,
  commentNo
}) => {
  const style = { color: categoryColors[categories] || categoryColors.default };

  const commentCount =  post.getCommentCount();

  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffMs = now - createdDate;

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  let timeSincePost;
  if (diffDays > 0) {
    timeSincePost = diffDays + " dan";
  } else if (diffHours > 0) {
    timeSincePost = diffHours + " sat";
  } else if (diffMinutes > 0) {
    timeSincePost = diffMinutes + " min";
  } else {
    timeSincePost = "sada";
  }

  return (
    <div className="article-card">
      <div className="article-card-wrapper">
        <div className="article-card-content">
          <div className="article-image-wrapper">
            <img
              src={
                photo
                  ? stables.UPLOAD_FOLDER_BASE_URL + photo
                  : "/default-image.jpg"
              }
              alt=""
              className="article-image"
            />
          </div>
          <div className="article-details-container">
            <div className="caption">{caption}</div>
            <h2 className="article-title">{title}</h2>
          </div>
          <div className="article-share-comments-time">
            <div>{timeSincePost}</div>
            <div className="article-shares-comments">
              <div className="article-shares">
                <img src="/shares.svg" alt="shares" />
                {sharesNo}
              </div>
              <div className="article-comments">
                <img src="/comments.svg" alt="comments" />
                {commentCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
