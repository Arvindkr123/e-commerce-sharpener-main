import React from "react";
import classes from "./cart.module.css";
import Modal from "../Modal/Modal";
import { Button } from "react-bootstrap";
import { useCartContext } from "../../store/CartProvider";
import CartItem from "./CartItem";

const Cart = ({ hideCartHandler }) => {
  const ctx = useCartContext();
  const totalAmount = ctx.totalAmount.toFixed(2);
  const hastItem = ctx.products.length > 0;

  const cartItemRemoveHandler = (id) => {};
  const cartItemAddHandler = (product) => {};

  // cart elements
  const cartElements = (
    <ul className={classes["cart-items"]}>
      {ctx.products &&
        ctx.products.map((product) => {
          return (
            <CartItem
              key={product.id}
              title={product?.title}
              amount={product?.amount}
              price={product?.price}
              id={product?.id}
              onRemove={cartItemRemoveHandler.bind(null, product.id)}
              onAdd={cartItemAddHandler.bind(null, product)}
            />
          );
        })}
    </ul>
  );

  return (
    <Modal>
      {cartElements}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <Button
          variant="danger"
          style={{ marginRight: 5 }}
          onClick={hideCartHandler}
        >
          Close
        </Button>
        {hastItem && <Button variant="primary">Order</Button>}
      </div>
    </Modal>
  );
};

export default Cart;
