import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProductResponse } from "../../api/products/fetchers";
import toast from "react-hot-toast";

export type TCartItem = TProductResponse & { quantity: number };

type TInitialState = {
  cartItems: TCartItem[];
  amount: number;
  total: number;
};

const initialState: TInitialState = {
  cartItems: [],
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<TProductResponse>) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === payload.id
      );
      if (existingItem) {
        if (existingItem.quantity < payload.stock!) {
          existingItem.quantity += 1;
        } else {
          toast.error("Cannot add more items. Stock limit reached.");
        }
      } else {
        state.cartItems.push({ ...payload, quantity: 1 });
        toast.success("Item added to cart.");
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      state.cartItems = [];
      state.total = 0;
    },
    removeItemFromCart: (state, { payload }: PayloadAction<number>) => {
      const existingItem = state.cartItems.find((item) => item.id === payload);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== payload
          );
          toast.success("Item removed from cart.");
        }
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    cartData: (state) => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        state.cartItems = JSON.parse(storedCart);
      }
    },
    calculateTotal: (state) => {
      let total = 0;
      state.cartItems.forEach((item) => {
        total += Number(item.price) * item.quantity;
      });
      state.total = total;
      localStorage.setItem("total", JSON.stringify(state.total));
    },
  },
});

export const {
  addToCart,
  removeItemFromCart,
  clearCart,
  cartData,
  calculateTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
