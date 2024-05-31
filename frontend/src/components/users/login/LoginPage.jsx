import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import "./login-page.css";
import { logIn } from "../../../services/index/users.js";
import { userActions } from "../../../store/reducers/userReducers.js";
import MainLayout from "../../MainLayout.jsx";

const LoginPage = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const mutation = useMutation(
    ({ email, password }) => logIn({ email, password }),
    {
      onSuccess: (data) => {
        dispatch(userActions.setUserInfo(data));
        localStorage.setItem("account", JSON.stringify(data));
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      }
    }
  );

  useEffect(() => {
    if (userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isLoading }
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onChange"
  });

  const submitHandler = (data) => {
    const { email, password } = data;
    mutation.mutate({ email, password });
  };

  return (
    <MainLayout>
      <section className="register-page-container">
        <div className="register-form-container">
          <img src="../../logo.svg" alt="register" className="register-image" />
          <span className="sublogo">Clone</span>
          <h1 className="form-title">Prijavite se</h1>
          <form className="form" onSubmit={handleSubmit(submitHandler)}>
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
            <div className="additional-info">
              <Link to="/forgot-password" className="login-link">
                Zaboravili ste password?
              </Link>
            </div>
            <button
              type="submit"
              className="submit-button"
              disabled={!isValid || isLoading}
            >
              Prijava
            </button>
            <div className="additional-info">
              <Link to="/register" className="register-link">
                Nemate nalog? Registrujte se
              </Link>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default LoginPage;
