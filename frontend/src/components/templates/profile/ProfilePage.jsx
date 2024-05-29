import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";

import "./profile-page.css";
import { getUserProfile } from "../../../services/index/users.js";
import ProfilePicture from "../../atoms/profile-picture/ProfilePicture.jsx";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["userProfile"]
  });

  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isLoading },
    watch
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    values: {
      name: profileIsLoading ? "" : profileData?.name,
      email: profileIsLoading ? "" : profileData?.email
    },
    mode: "onChange"
  });

  const submitHandler = (data) => {};

  return (
    <section className="register-page-container">
      <div className="register-form-container">
        <ProfilePicture avatar={profileData?.avatar}/>
        <form className="form" onSubmit={handleSubmit(submitHandler)}>
          <div className="input-field">
            <label htmlFor="name">Ime</label>
            <input
              type="name"
              id="name"
              {...register("name", {
                minLength: {
                  value: 1,
                  message: "Ime mora imati minimalno 1 karakter"
                },
                required: {
                  value: true,
                  message: "Ime je obavezno"
                }
              })}
              placeholder="Vase ime"
              required
            ></input>
            {errors.name?.message && (
              <p className="error-message">{errors.name?.message}</p>
            )}
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Email nije validan"
                },
                required: {
                  value: true,
                  message: "Email je obavezan"
                }
              })}
              placeholder="Vas email"
              required
            ></input>
            {errors.email?.message && (
              <p className="error-message">{errors.email?.message}</p>
            )}
          </div>
          <div className="input-field">
            <label htmlFor="password">Lozinka</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Lozinka je obavezna"
                },
                minLength: {
                  value: 6,
                  message: "minimalno 6 karaktera"
                }
              })}
              placeholder="Vasa lozinka"
              required
            ></input>
            {errors.password?.message && (
              <p className="error-message">{errors.password?.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={!isValid || isLoading}
          >
            Azuriraj profil
          </button>
          <div className="additional-info"></div>
        </form>
      </div>
    </section>
  );
};

export default ProfilePage;
