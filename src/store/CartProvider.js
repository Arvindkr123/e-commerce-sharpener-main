import { useContext, useReducer } from "react";
import CartContext from "./CartContext";

let defaultCartState = {
  products: [],
  totalAmount: 0,
};

const cardReducer = (state, action) => {
  if (action.type === "ADD") {
    // console.log("from cart context value : ", action.payload);
    const updatedProducts = state.products.concat(action.payload);
    const updatedAmount =
      state.totalAmount + action.payload.price * action.payload.amount;
    return {
      products: updatedProducts,
      totalAmount: updatedAmount,
    };
  }
  return defaultCartState;
};

export const CartProvider = ({ children }) => {
  const [cartSlice, dispatch] = useReducer(cardReducer, defaultCartState);

  const addItemHandler = (item) => {
    dispatch({ type: "ADD", payload: item });
  };

  const removeItemHandler = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const cartContextValue = {
    products: cartSlice.products,
    totalAmount: cartSlice.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
