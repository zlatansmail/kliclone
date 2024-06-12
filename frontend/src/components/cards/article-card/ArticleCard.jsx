import React from "react";
import { Link } from "react-router-dom";

import "./article-card.css";
import { timeSince } from "../../../utils/timeSince.js";
import stables from "../../../constants/stables.js";
import images from "../../../constants/images.js";

export const ArticleCard = ({
  slug,
  categories,
  title,
  caption,
  photo,
  createdAt,
  sharesNo,
  comments = []
}) => {
  const getCategoryColor = (categories) => {
    if (!categories) return "white";
    switch (categories[0]) {
      case "Vijesti":
        return "rgba(211,61,61,1)";
      case "Biznis":
        return "rgba(239,111,62,1)";
      case "Sport":
        return "rgba(85,172,83,1)";
      case "Magazin":
        return "rgba(164,80,145,1)";
      case "Lifestyle":
        return "rgba(226,166,0,1)";
      case "Scitech":
        return "rgba(64,175,238,1)";
      case "Auto":
        return "rgba(72,123,175,1)";
      default:
        return "rgb(75,85,99)";
    }
  };

  let timeSincePost = timeSince(createdAt);

  return (
    <div className="article-card">
      <div className="article-card-wrapper">
        <div className="article-card-content">
          <Link to={`/clanak/${slug}`}>
            <div className="article-image-wrapper">
              <img
                src={
                  photo
                    ? stables.UPLOAD_FOLDER_BASE_URL + photo
                    : images.samplePostImage
                }
                alt=""
                className="article-image"
              />
            </div>
          </Link>

          <div className="article-details-container">
            <div
              className="caption"
              style={{
                color: getCategoryColor(categories ? categories[0] : undefined)
              }}
            >
              {caption}
            </div>
            <Link to={`/clanak/${slug}`}>
              <h2 className="article-title">{title}</h2>
            </Link>
          </div>

          <div className="article-share-comments-time">
            <div>{timeSincePost}</div>
            <div className="article-shares-comments">
              <div className="article-shares">
                <img src="/shares.svg" alt="shares" />
                {sharesNo || 0}
              </div>
              <div className="article-comments">
                <img src="/comments.svg" alt="comments" />
                {comments.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
