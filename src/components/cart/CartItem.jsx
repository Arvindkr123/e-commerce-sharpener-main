import React from "react";
import classes from "./CartItem.module.css";
const CartItem = ({ title, id, price, amount, onAdd, onRemove }) => {
  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{title}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
