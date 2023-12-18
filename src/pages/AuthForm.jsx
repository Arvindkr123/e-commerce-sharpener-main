import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AuthForm.module.css";
import config from "../config/config";
import { useAuthContext } from "../store/AuthContext";

const AuthForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const authCtx = useAuthContext();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setError(null); // Reset error when switching between login and sign up
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    setIsLoading(true);
    setError(null);

    const url = isLogin
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.apiKey}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.apiKey}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
      });

      setIsLoading(false);

      if (res.ok) {
        const data = await res.json();
        // console.log(data);
        authCtx.login(data.idToken);
        navigate("/store");
      } else {
        const data = await res.json();
        let errorMessage = "Authentication failed";
        setError(errorMessage);
      }
    } catch (error) {
      setError("An error occurred while processing your request.");
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailRef} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={passwordRef} type="password" id="password" required />
        </div>
        <div className={classes.actions}>
          {!isLoading && error === null && (
            <button type="submit">
              {isLogin ? "Login" : "Create Account"}
            </button>
          )}
          {!isLoading && error && <p>{error}</p>}
          {isLoading && <p>Loading...</p>}
          <button
            type="button"
            onClick={switchAuthModeHandler}
            className={classes.toggle}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
