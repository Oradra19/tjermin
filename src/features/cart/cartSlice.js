import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], isOpen: false };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const current = state.items.find(
        (item) => item.id === action.payload.product.id,
      );
      if (current) current.quantity += action.payload.quantity ?? 1;
      else
        state.items.push({
          ...action.payload.product,
          quantity: action.payload.quantity ?? 1,
        });
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((cartItem) => cartItem.id === action.payload.id);
      if (!item) return;

      item.quantity += action.payload.amount;
      if (item.quantity <= 0) {
        state.items = state.items.filter((cartItem) => cartItem.id !== item.id);
      }
    },
    setCartOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});
export const { addToCart, removeFromCart, setCartOpen, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
