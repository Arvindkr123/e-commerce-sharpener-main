import { createContext } from "react";
const CartContext = createContext({
  products: [],
  totalAmount: 0,
  addItem: (product) => {},
  removeItem: (id) => {},
});
export default CartContext;
