import React, { useState } from "react";
import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "./products/ProductList";
import Cart from "./components/cart/Cart";
const App = () => {
  const [cartShown, setCartShown] = useState(false);
  const showCartHandler = () => {
    setCartShown(true);
  };
  const hideCartHandler = () => {
    setCartShown(false);
  };
  return (
    <>
      {cartShown && <Cart hideCartHandler={hideCartHandler} />}
      <Header showCartHandler={showCartHandler} />
      <ProductList />
    </>
  );
};

export default App;
