import React from 'react';
import { Link } from 'react-router-dom';

import './login-page.css';

const LoginPage = () => {

    const submitHandler = () => {
        console.log("submit");
      };


  return (
    <section className="login-page-container">
      <div className="login-form-container">
        <img src="../../logo.svg" alt="register" className="login-image" />
        <span className="sublogo">Clone</span>
        <h1 className="form-title">Prijavite se</h1>
        <form className="form" onSubmit={submitHandler}>
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
          <div className="additional-info">
            <Link to="/forgot-password" className="login-link">
              Zaboravili ste password?
            </Link>
          </div>
          <button className="submit-button" type='submit'>Prijava</button>
          <div className="additional-info">
            <Link to="/register" className="register-link">
              Nemate nalog? Registrujte se
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default LoginPage