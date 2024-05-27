import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./register-page.css";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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

  const submitHandler = () => {
    console.log("submit");
  };

  return (
    <section className="register-page-container">
      <div className="register-form-container">
        <img src="../../logo.svg" alt="register" className="register-image" />
        <span className="sublogo">Clone</span>
        <h1 className="form-title">Registrujte se</h1>
        <form className="form" onSubmit={submitHandler}>
          <div className="input-field">
            <label htmlFor="name">Ime</label>
            <input
              type="name"
              id="name"
              placeholder="Vase ime"
              required
            ></input>
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Vas email"
              required
            ></input>
          </div>
          <div className="input-field">
            <label htmlFor="password">Lozinka</label>
            <input
              type="password"
              id="password"
              placeholder="Vasa lozinka"
              required
            ></input>
          </div>
          <div className="input-field">
            <label htmlFor="password">Potvrdite lozinku</label>
            <input
              type="password"
              id="password"
              placeholder="Ponovite lozinku"
              required
            ></input>
          </div>
          <div className="additional-info">
            <Link to="/forgot-password" className="login-link">
              Zaboravili ste password?
            </Link>
          </div>
          <button type='submit' className="submit-button">Registruj me</button>
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
