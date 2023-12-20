import { useContext, useEffect, useReducer } from "react";
import CartContext from "./CartContext";
import { useAuthContext } from "./AuthContext";
import config from "../config/config";

let defaultCartState = {
  products: [],
  totalAmount: 0,
};

const cardReducer = (state, action) => {
  if (action.type === "ADD") {
    //console.log(action);
    return {
      products: action.products,
      totalAmount: action.totalAmount,
    };
  }
  if (action.type === "CLEAR") {
    return {
      products: action.products,
      totalAmount: action.totalAmount,
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
  const { email } = useAuthContext();
  const emailForCrud = email.replace("@", "").replace(".", "");

  useEffect(() => {
    const setDefaultValue = async () => {
      try {
        const res = await fetch(`${config.dbKey}/cart/${emailForCrud}.json`);
        const data = await res.json();
        dispatch({
          type: "ADD",
          payload: data?.products || [],
          totalAmount: data?.totalAmount || 0,
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (emailForCrud) {
      setDefaultValue();
    }
  }, [emailForCrud]);

  const addItemHandler = async (item) => {
    //console.log(item);
    const updatedAmount = cartSlice.totalAmount + item.price * item.amount;

    // find the index of that item
    const existingCartItemIndex = cartSlice.products.findIndex(
      (ele) => ele.id === item.id
    );
    let existingCartItem = cartSlice.products[existingCartItemIndex];

    let updatedProducts;
    if (existingCartItem) {
      let updatedProduct = {
        ...existingCartItem,
        amount: existingCartItem.amount + item.amount,
      };
      updatedProducts = [...cartSlice.products];
      updatedProducts[existingCartItemIndex] = updatedProduct;
    } else {
      updatedProducts = cartSlice.products.concat(item);
    }
    dispatch({
      type: "ADD",
      products: updatedProducts,
      totalAmount: updatedAmount,
    });

    try {
      await fetch(`${config.dbKey}/cart/${emailForCrud}.json`, {
        method: "PUT",
        body: JSON.stringify({
          products: updatedProducts,
          totalAmount: updatedAmount,
        }),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeItemHandler = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const clearCartHandler = () => {
    dispatch({ type: "CLEAR", products: [], totalAmount: 0 });
  };

  const cartContextValue = {
    products: cartSlice.products,
    totalAmount: cartSlice.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
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
