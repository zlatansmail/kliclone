import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";

import "./profile-page.css";
import { getUserProfile } from "../../../services/index/users.js";
import { updateProfile } from "../../../services/index/users.js";
import { userActions } from "../../../store/reducers/userReducers.js";
import ProfilePicture from "../profile/profile-picture/ProfilePicture.jsx";
import MainLayout from "../../MainLayout.jsx";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(
    ({ name, email, password }) =>
      updateProfile({
        token: userState.userInfo.token,
        userData: { name, email, password }
      }),
    {
      onSuccess: (data) => {
        dispatch(userActions.setUserInfo(data));
        localStorage.setItem("account", JSON.stringify(data));
        queryClient.invalidateQueries(["userProfile"]);
        toast.success("Profil azuriran");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      }
    }
  );

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
    values: useMemo(() => {
      return {
        name: profileIsLoading ? "" : profileData?.name,
        email: profileIsLoading ? "" : profileData?.email
      };
    }, [profileData?.name, profileData?.email, profileIsLoading]),
    mode: "onChange"
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutation.mutate({ name, email, password });
  };

  return (
    <MainLayout>
      <section className="register-page-container">
        <div className="register-form-container">
          <h2 className="heading">Moj profil</h2>
          <ProfilePicture avatar={profileData?.avatar} />
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
              <label htmlFor="password">Nova Lozinka (neobavezno)</label>
              <input
                type="password"
                id="password"
                {...register("password")}
                placeholder="Unesite novu lozinku"
              ></input>
              {errors.password?.message && (
                <p className="error-message">{errors.password?.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="submit-button"
              disabled={!isValid || profileIsLoading}
            >
              Azuriraj profil
            </button>
            <div className="additional-info"></div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;
