import React from "react";
import { FaReply } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

import "./comment.css";
import images from "../../../constants/images.js";
import CommentForm from "../comment-form/CommentForm.jsx";

const Comment = ({
  comment,
  loggedInUserId,
  affectedComment,
  setAffectedComment,
  addComment,
  parentId = null,
  updateComment,
  deleteComment,
  replies
}) => {
  const isUserLoggedIn = Boolean(loggedInUserId);
  const commentOwner = comment.user._id === loggedInUserId;

  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === comment._id;

  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === comment._id;

  const repliedCommentId = parentId ? parentId : comment._id;
  const replyOnUserId = comment.user._id;

  return (
    <div className="comment-container">
      <div className="comment-user-details">
        <img
          src={comment?.user?.avatar || images.sampleUserImage}
          alt="user avatar"
        />
        <div className="comment-user-name-time">
          <div className="comment-user">{comment?.user?.name}</div>
          <div className="comment-time">
            {new Date(comment.createdAt).toLocaleDateString("bs", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
              hour: "2-digit"
            })}
          </div>
        </div>
      </div>
      <div className="comment-desc-wrapper">
        {!isEditing && <div className="comment-desc">{comment.desc} </div>}
      </div>
      <div className="comment-buttons-wrapper">
        {isUserLoggedIn && (
          <button
            className="comment-reply-btn"
            onClick={() => {
              setAffectedComment({ type: "replying", _id: comment._id });
            }}
          >
            <FaReply /> Odgovori
          </button>
        )}

        {commentOwner && (
          <>
            <button
              onClick={() =>
                setAffectedComment({ type: "editing", _id: comment._id })
              }
              className="comment-edit-btn"
            >
              <CiEdit /> Uredi
            </button>
            <button
              onClick={() => deleteComment(comment._id)}
              className="comment-delete-btn"
            >
              <MdDeleteForever /> Obrisi
            </button>
          </>
        )}
      </div>
      {isEditing && (
        <CommentForm
          btnLable={"Uredi"}
          formSubmitHandler={(value) => updateComment(value, comment._id)}
          formCancelHandler={() => setAffectedComment(null)}
          initialText={comment.desc}
        />
      )}
      {isReplying && (
        <CommentForm
          btnLable={"Odgovori"}
          formSubmitHandler={(value) => {
            addComment(value, repliedCommentId, replyOnUserId);
            
          }}
          formCancelHandler={() => setAffectedComment(null)}
        />
      )}
      {replies.length > 0 && (
        <div>
          {replies.map((reply) => (
            <Comment
              key={reply._id}
              addComment={addComment}
              affectedComment={affectedComment}
              setAffectedComment={setAffectedComment}
              comment={reply}
              deleteComment={deleteComment}
              loggedInUserId={loggedInUserId}
              replies={[]}
              updateComment={updateComment}
              parentId={comment._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
