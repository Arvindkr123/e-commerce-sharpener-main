import React from "react";
import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "./products/ProductList";
const App = () => {
  return (
    <>
      <Header />
      <ProductList/>
    </>
  );
};

export default App;
