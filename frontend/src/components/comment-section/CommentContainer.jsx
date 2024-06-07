import React, { useEffect, useState } from "react";

import "./comment-container.css";
import { getCommentsData } from "../../data/comments";
import CommentForm from "./comment-form/CommentForm";
import Comment from "./comment/Comment";

const CommentContainer = () => {
  const [comments, setComments] = useState([]);
  const mainComments = comments.filter((comment) => comment.parent === null);

  console.log(comments);

  useEffect(() => {
    (async () => {
      const commentData = await getCommentsData();
      setComments(commentData);
    })();
  }, []);

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    const newComment = {
      _id: "10",
      user: {
        _id: "a",
        name: "Zlatan"
      },
      desc: value,
      post: "1",
      parent,
      replyOnUser,
      createdAt: new Date().toISOString()
    };
    setComments((curState) => {
      return [newComment, ...curState];
    });
  };

  return (
    <div className="comments-container">
      <div className="comment-form-container">
        <h3>Komentari</h3>
        <CommentForm
          btnLable={"Objavi komentar"}
          formSubmitHandler={(value) => {
            addCommentHandler(value);
          }}
        />
        <button className="all-comments-btn" type="button">
          Prikaži sve komentare
        </button>
      </div>
      <div className="comments-container">
        {mainComments.map((comment) => (
          <Comment comment={comment}/>
        ))}
      </div>
    </div>
  );
};

export default CommentContainer;
