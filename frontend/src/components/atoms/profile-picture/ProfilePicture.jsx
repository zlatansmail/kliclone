import React from "react";
import { HiOutlineCamera } from "react-icons/hi";

import './profile-picture.css';
import { stables } from "../../../constants";

const ProfilePicture = ({ avatar }) => {
  return (
    <div className="avatar-container">
      <div className="outer-wrapper">
        <label htmlFor="profilePicture" className="inner-wrapper">
          {avatar ? (
            <img
              src={stables.UPLOAD_FOLDER_BASE_URL + avatar}
              alt="profile avatar"
              className="avatar-image"
            />
          ) : (
            <HiOutlineCamera className="avatar-icon" />
          )}
        </label>
        <input type="file" className="pic-input" id="profilePicture" />
      </div>
      <button className="delete-button">Delete</button>
    </div>
  );
};

export default ProfilePicture;
