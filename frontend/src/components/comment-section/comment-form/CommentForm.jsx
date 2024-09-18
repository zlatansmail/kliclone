import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

import "./comment-form.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CommentForm = ({
  btnLable,
  formSubmitHandler,
  formCancelHandler = null,
  initialText = "",
  loading = false
}) => {
  const [value, setValue] = useState(initialText);
  const userState = useSelector((state) => state.user);

  console.log(userState.userInfo);

  const submitHandler = (e) => {
    e.preventDefault();
    formSubmitHandler(value);
    setValue("");
  };
  return (
    <div className="form-container">
      <form onSubmit={submitHandler}>
        <div className="textarea-container">
          <textarea
            name="comment"
            rows="4"
            placeholder="Vas Komentar"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></textarea>
          <div className="">
            {formCancelHandler && (
              <button onClick={formCancelHandler} className="btn-cancel">
                Otkazi
              </button>
            )}
            <button
              disabled={loading || userState.userInfo === null}
              type="submit"
            >
              {userState.userInfo ? <MdOutlineEdit /> : ""}
              {userState.userInfo != null
                ? btnLable
                : <Link className="sign-in-to-comment" to="/login">Prijavite se da bi ostavili komentar</Link>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
