import React from "react";
import { GrCart } from "react-icons/gr";
import classes from "./headerCart.module.css";
const HeaderCartButton = ({ showCartHandler }) => {
  return (
    <>
      <button className={classes.button} onClick={showCartHandler}>
        <span className={classes.icon}>
          <GrCart size={30} />
        </span>
        <span className={classes.badge}>3</span>
      </button>
    </>
  );
};

export default HeaderCartButton;
