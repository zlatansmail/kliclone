import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

import "./comment-form.css";

const CommentForm = ({ btnLable, formSubmitHandler }) => {
  const [value, setValue] = useState("");
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
          <button type="submit">
            <MdOutlineEdit />
            {btnLable}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
