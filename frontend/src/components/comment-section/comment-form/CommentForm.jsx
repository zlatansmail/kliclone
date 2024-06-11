import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

import "./comment-form.css";

const CommentForm = ({
  btnLable,
  formSubmitHandler,
  formCancelHandler = null,
  initialText = "",
  loading = false
}) => {
  const [value, setValue] = useState(initialText);

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
            <button disabled={loading} type="submit">
              <MdOutlineEdit />
              {btnLable}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
