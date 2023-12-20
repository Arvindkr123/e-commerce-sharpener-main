import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AuthForm.module.css";
import config from "../config/config";
import { useAuthContext } from "../store/AuthContext";
import { useCartContext } from "../store/CartProvider";

const AuthForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  // const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasAccount, setHasAccount] = useState(true);
  const authCtx = useAuthContext();
  const cartCtx = useCartContext();

  const switchAuthModeHandler = () => {
    // setIsLogin((prevState) => !prevState);
    setHasAccount((prev) => !prev);
    setError(null); // Reset error when switching between login and sign up
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const emailForCrud = enteredEmail.replace("@", "").replace(".", "");
    setIsLoading(true);
    setError(null);

    let url;
    if (hasAccount) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.apiKey}`;
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
          authCtx.login(data.idToken, data.email);
          navigate("/store");
        } else {
          const data = await res.json();
          let errorMessage = "Authentication failed";
          setError(errorMessage);
        }
      } catch (error) {
        setError("An error occurred while processing your request.");
      }
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.apiKey}`;
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
          authCtx.login(data.idToken, data.email);
          navigate("/store");
        } else {
          const data = await res.json();
          let errorMessage = "Authentication failed";
          setError(errorMessage);
        }
      } catch (error) {
        setError("An error occurred while processing your request.");
      }

      let cart = {};
      fetch(`${config.dbKey}/cart/${emailForCrud}.json`, {
        method: "POST",
        body: JSON.stringify(cart),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <section className={classes.auth}>
      <h1>{hasAccount ? "Login" : "Sign Up"}</h1>
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
              {hasAccount ? "Login" : "Create Account"}
            </button>
          )}
          {!isLoading && error && <p>{error}</p>}
          {isLoading && <p>Loading...</p>}
          <button
            type="button"
            onClick={switchAuthModeHandler}
            className={classes.toggle}
          >
            {hasAccount ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
