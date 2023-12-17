import { useContext, useReducer } from "react";
import CartContext from "./CartContext";

let defaultCartState = {
  products: [],
  totalAmount: 0,
};

const cardReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingCartItemIndex = state.products.findIndex(
      (product) => product.id === action.payload.id
    );
    const existingCartItem = state.products[existingCartItemIndex];
    let updatedProducts;
    if (existingCartItem) {
      // create new obj to assign the values
      let updatedProduct = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.payload.amount,
      };
      updatedProducts = [...state.products];
      updatedProducts[existingCartItemIndex] = updatedProduct;
    } else {
      updatedProducts = state.products.concat(action.payload);
    }
    const updatedAmount =
      state.totalAmount + action.payload.price * action.payload.amount;
    return {
      products: updatedProducts,
      totalAmount: updatedAmount,
    };
  }

  if (action.type === "REMOVE") {
    // first find the index
    const existingCartItemIndex = state.products.findIndex(
      (product) => product.id === action.payload
    );
    // get that item of the index which get
    const existingCartItem = state.products[existingCartItemIndex];
    let updatedProducts;
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    if (existingCartItem.amount === 1) {
      updatedProducts = state.products.filter((p) => p.id !== action.payload);
    } else {
      const updatedProduct = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedProducts = [...state.products];
      updatedProducts[existingCartItemIndex] = updatedProduct;
    }
    return {
      products: updatedProducts,
      totalAmount: updatedTotalAmount,
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
