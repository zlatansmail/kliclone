import React from "react";
import { useState } from "react";
import Cropper from "react-easy-crop";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import "./crop-easy.css";
import getCroppedImg from "./cropImage.js";
import { updateProfilePicture } from "../../services/index/users.js";
import { userActions } from "../../store/reducers/userReducers.js";

const CropEasy = ({ photo, setOpenCrop }) => {
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

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
        toast.success("Profilna slika je azurirana");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      }
    }
  );
  const isLoading = mutation.isLoading;

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropImage = async (save) => {
    try {
      const croppedImage = await getCroppedImg(photo?.url, croppedAreaPixels);
      const file = new File([croppedImage.file], photo.file.name, {
        type: photo.file.type
      });
      const formData = new FormData();
      formData.append("avatar", file);
      mutation.mutate({ token: userState.userInfo.token, formData });
    } catch (error) {
      toast.error("Greska pri izrezivanju slike");
      console.log(error);
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <h2 className="heading">Crop image</h2>
        <div className="cropper-container">
          <Cropper
            image={photo?.url}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onZoomChange={setZoom}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
          />
        </div>
        <div className="slider-wrapper">
          <label className="slider-label" htmlFor="zoomRange">Zoom {`${Math.round(zoom * 100)}%`}</label>
          <input
          className="slider"
            type="range"
            id="zoomRange"
            min="1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
          />
        </div>
        <div className="button-wrapper">
          <button className="cancel-btn" disabled={isLoading} onClick={() => setOpenCrop(false)} >Odustani</button>
          <button className="save-btn" disabled={isLoading} onClick={() => handleCropImage()}>Izrezi i Spasi</button>
        </div>
      </div>
    </div>
  );
};

export default CropEasy;
