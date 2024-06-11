import React, { useState } from "react";

import "./comment-container.css";
import CommentForm from "./comment-form/CommentForm";
import Comment from "./comment/Comment";
import { useMutation, useQueryClient } from "react-query";
import { createNewComment, deleteComment, updateComment } from "../../services/index/comments";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const CommentContainer = ({ loggedInUserId, comments, postSlug }) => {
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const [affectedComment, setAffectedComment] = useState(null);

  const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({ token, desc, slug, parent, replyOnUser }) => {
        return createNewComment({ token, desc, slug, parent, replyOnUser });
      },
      onSuccess: (data) => {
        toast.success("Komentar uspješno dodat, bit ce vidljiv nakon odobrenja");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      }
    });

    const { mutate: mutateUpdateComment } =
    useMutation({
      mutationFn: ({ token, desc, commentId }) => {
        return updateComment({ token, desc, commentId });
      },
      onSuccess: () => {
        toast.success("Komentar uspješno uredjen, bit ce vidljiv nakon odobrenja");
        queryClient.invalidateQueries(["post", postSlug]);
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      }
    });

    const { mutate: mutateDeleteComment } =
    useMutation({
      mutationFn: ({ token, commentId }) => {
        return deleteComment({ token, commentId });
      },
      onSuccess: () => {
        toast.success("Komentar uspješno obrisan");
        queryClient.invalidateQueries(["post", postSlug]);
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      }
    });

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    mutateNewComment({
      desc: value,
      parent,
      replyOnUser,
      token: userState.userInfo.token,
      slug: postSlug
    });
    setAffectedComment(null);
  };

  const updateCommentHandler = (value, commentId) => {
    mutateUpdateComment({
      token: userState.userInfo.token,
      desc: value,
      commentId
    });
    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId) => {
    mutateDeleteComment({
      token: userState.userInfo.token,
      commentId
    })
  };

  return (
    <div className="all-comments-container">
      <div className="comment-form-container">
        <h3>Komentari</h3>
        <CommentForm
          btnLable={"Objavi komentar"}
          formSubmitHandler={(value) => {
            addCommentHandler(value);
          }}
          loading={isLoadingNewComment}
        />
        <button className="all-comments-btn" type="button">
          Prikaži sve komentare
        </button>
      </div>
      <div className="comments-container">
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            loggedInUserId={loggedInUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            replies={comment.replies}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentContainer;
