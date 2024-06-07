import React from "react";

import "./comment.css";
import images from "../../../constants/images.js";

const Comment = (comment) => {
  return (
    <div className="comment-container">
      <div className="comment-user-details">
        <img src={images.sampleUserImage} alt="user avatar" />
        <div className="comment-user-name-time">
          <div className="comment-user">username</div>
          <div className="comment-time">1 sat</div>
        </div>
      </div>
      <div className="comment-desc-wrapper">
        <div className="comment-desc">
          Lorem ipsum dolor sit amet, cons asdasdasda
        </div>
      </div>
      <div className="comment-buttons-wrapper">
        <button className="comment-reply-btn">Odgovori</button>
        <button className="comment-edit-btn">Uredi</button>
        <button className="comment-delete-btn">Obrisi</button>
      </div>
    </div>
  );
};

export default Comment;
