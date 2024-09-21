import React from "react";
import { Link } from "react-router-dom";

import "./article-card.css";
import { timeSince } from "../../../utils/timeSince.js";
import stables from "../../../constants/stables.js";
import images from "../../../constants/images.js";

export const ArticleCard = ({
  slug,
  captionColor,
  title,
  caption,
  photo,
  createdAt,
  sharesNo,
  commentsNo
}) => {
  let timeSincePost = timeSince(createdAt);

  return (
    <div className="article-card">
      <div className="article-card-wrapper">
        <div className="article-card-content">
          <div className="article-image-container">
            <Link to={`/clanak/${slug}`}>
              <div className="article-image-wrapper">
                <img
                  src={
                    photo
                      ? stables.UPLOAD_FOLDER_BASE_URL + photo
                      : images.samplePostImage
                  }
                  alt={title + " image"}
                  className="article-image"
                />
              </div>
            </Link>
          </div>
          <div className="article-details-container">
            <div className="article-caption-heading">
              <div
                className="caption"
                style={{
                  color: captionColor
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
                  {commentsNo || 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
