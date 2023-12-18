import React, { useState } from "react";
import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "./products/ProductList";
import Cart from "./components/cart/Cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import AuthForm from "./pages/AuthForm";
import ProtectedComponent from "./components/protected/ProtectedComponent";

const App = () => {
  const [cartShown, setCartShown] = useState(false);

  const showCartHandler = () => {
    setCartShown(true);
  };

  const hideCartHandler = () => {
    setCartShown(false);
  };

  return (
    <BrowserRouter>
      {cartShown && <Cart hideCartHandler={hideCartHandler} />}
      <Header showCartHandler={showCartHandler} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/store"
          element={<ProtectedComponent Component={ProductList} />}
        />
        <Route
          path="/about"
          element={<ProtectedComponent Component={About} />}
        />
        <Route path="/auth" element={<AuthForm />} />
        <Route
          path="/contact"
          element={<ProtectedComponent Component={Contact} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
