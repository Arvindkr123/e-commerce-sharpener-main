import React from "react";
import { GrCart } from "react-icons/gr";
import classes from "./headerCart.module.css";
import { useCartContext } from "../../store/CartProvider";
const HeaderCartButton = ({ showCartHandler }) => {
  const { products } = useCartContext();
  const numberOfItemsInCarts = products?.reduce(
    (acc, cur) => acc + cur.amount,
    0
  );
  return (
    <>
      <button className={classes.button} onClick={showCartHandler}>
        <span className={classes.icon}>
          <GrCart size={30} />
        </span>
        <span className={classes.badge}>{numberOfItemsInCarts}</span>
      </button>
    </>
  );
};

export default HeaderCartButton;
