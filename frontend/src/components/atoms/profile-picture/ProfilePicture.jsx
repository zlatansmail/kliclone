import React from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { HiOutlineCamera } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";

import "./profile-picture.css";
import { stables } from "../../../constants";
import CropEasy from "../../molecules/crop/CropEasy";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import { updateProfilePicture } from "../../../services/index/users";
import { userActions } from "../../../store/reducers/userReducers";

const ProfilePicture = ({ avatar }) => {
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [openCrop, setOpenCrop] = useState(false);
  const [photo, setPhoto] = useState(null);

  const mutation = useMutation(
    ({ token, formData }) =>
      updateProfilePicture({
        token: token,
        formData: formData
      }),
    {
      onSuccess: (data) => {
        dispatch(userActions.setUserInfo(data));
        setOpenCrop(false);
        localStorage.setItem("account", JSON.stringify(data));
        queryClient.invalidateQueries(["userProfile"]);
        toast.success("Profilna slika je uklonjena");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      }
    }
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto({ url: URL.createObjectURL(file), file });
    setOpenCrop(true);
  };

  const handleDeleteImage = () => {
    if (
      window.confirm("Da li ste sigurni da zelite da obrisete profilnu sliku?")
    ) {
      try {
        const formData = new FormData();
        formData.append("avatar", undefined);

        mutation.mutate({ token: userState.userInfo.token, formData });
      } catch (error) {
        toast.error("Greska pri izrezivanju slike");
        console.log(error);
      }
    }
  };

  return (
    <>
      {openCrop &&
        createPortal(
          <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
          document.getElementById("portal")
        )}
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
          <input
            type="file"
            className="pic-input"
            id="profilePicture"
            onChange={handleFileChange}
          />
        </div>
        <button onClick={handleDeleteImage} className="delete-button">
          <MdDeleteForever /> Obrisi
        </button>
      </div>
    </>
  );
};

export default ProfilePicture;
