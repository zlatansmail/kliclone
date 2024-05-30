import React, { useEffect }from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import "./register-page.css";
import { signUp } from "../../../services/index/users.js";
import { userActions } from "../../../store/reducers/userReducers.js";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const mutation = useMutation(
    ({ name, email, password }) => signUp({ name, email, password }),
    {
      onSuccess: (data) => {
        dispatch(userActions.setUserInfo(data));
        localStorage.setItem('account', JSON.stringify(data));
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
    formState: { errors, isValid, isLoading },
    watch
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    mode: "onChange"
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutation.mutate({ name, email, password });
  };

  const password = watch("password");

  return (
    <section className="register-page-container">
      <div className="register-form-container">
        <img src="../../logo.svg" alt="register" className="register-image" />
        <span className="sublogo">Clone</span>
        <h1 className="form-title">Registrujte se</h1>
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
          <div className="input-field">
            <label htmlFor="password">Potvrdite lozinku</label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Potvrda lozinke je obavezna"
                },
                validate: (value) => {
                  if (value !== password) {
                    return "Lozinke se ne poklapaju";
                  }
                }
              })}
              placeholder="Ponovite lozinku"
              required
            ></input>
            {errors.confirmPassword?.message && (
              <p className="error-message">{errors.confirmPassword?.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={!isValid || isLoading}
          >
            Registruj me
          </button>
          <div className="additional-info">
            <Link to="/login" className="login-link">
              Vec imate nalog? Ulogujte se
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
