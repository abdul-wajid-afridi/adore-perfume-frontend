import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { TGiftBoxResponse } from "../../api/gift-box/fetchers";

export type TGiftBoxCartItem = TGiftBoxResponse & { quantity: number };

type TInitialState = {
  giftBoxCartItems: TGiftBoxCartItem[];
  amount: number;
  total: number;
};

const initialState: TInitialState = {
  giftBoxCartItems: [],
  amount: 0,
  total: 0,
};

const giftBoxCartSlice = createSlice({
  name: "giftBoxCart",
  initialState,
  reducers: {
    addToGiftBoxCart: (state, { payload }: PayloadAction<TGiftBoxResponse>) => {
      const existingItem = state.giftBoxCartItems.find(
        (item) => item.id === payload.id
      );
      if (existingItem) {
        if (existingItem.quantity < payload.stock!) {
          existingItem.quantity += 1;
        } else {
          toast.error("Cannot add more items. Stock limit reached.");
        }
      } else {
        state.giftBoxCartItems.push({ ...payload, quantity: 1 });
        toast.success("Item added to cart.");
      }

      localStorage.setItem(
        "giftBoxCart",
        JSON.stringify(state.giftBoxCartItems)
      );
    },
    clearGiftBoxCart: (state) => {
      localStorage.removeItem("giftBoxCart");
      localStorage.removeItem("giftBoxTotal");
      state.giftBoxCartItems = [];
      state.total = 0;
    },
    removeGiftBoxItemFromCart: (state, { payload }: PayloadAction<number>) => {
      const existingItem = state.giftBoxCartItems.find(
        (item) => item.id === payload
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.giftBoxCartItems = state.giftBoxCartItems.filter(
            (item) => item.id !== payload
          );
          toast.success("Item removed from cart.");
        }
      }

      localStorage.setItem(
        "giftBoxCart",
        JSON.stringify(state.giftBoxCartItems)
      );
    },
    giftBoxCartData: (state) => {
      const storedCart = localStorage.getItem("giftBoxCart");
      if (storedCart) {
        state.giftBoxCartItems = JSON.parse(storedCart);
      }
    },

    calculateGiftBoxTotal: (state) => {
      let total = 0;

      state.giftBoxCartItems.forEach((item) => {
        // doing item?.packing?.price ? item?.packing?.price : 0 this to remove bug of null or undefined item.packing?.price

        total += Number(item.price) * item.quantity;
      });
      state.total = total;
      localStorage.setItem("giftBoxTotal", JSON.stringify(state.total));
    },
  },
});

export const {
  addToGiftBoxCart,
  removeGiftBoxItemFromCart,
  clearGiftBoxCart,
  giftBoxCartData,
  calculateGiftBoxTotal,
} = giftBoxCartSlice.actions;
export default giftBoxCartSlice.reducer;
