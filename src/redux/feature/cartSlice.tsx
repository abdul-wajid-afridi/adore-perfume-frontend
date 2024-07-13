// import { createSlice } from "@reduxjs/toolkit";

// let initialState = {
//   cartItems: [],
//   amount: 0,
//   total: 0,
//   loading: true,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, { payload }) => {
//       console.log("object");
//       !state.cartItems
//         ? (state.cartItems = [payload])
//         : (state.cartItems = [...state.cartItems, payload]);
//       localStorage.setItem("cart", JSON.stringify(state.cartItems));
//     },
//     clearCart: (state) => {
//       localStorage.removeItem("cart");
//       localStorage.removeItem("total");
//       state.cartItems = [];
//       state.total = 0;
//     },
//     removeItem: (state, { payload }) => {
//       state.cartItems = state.cartItems.filter((item) => item.id !== payload);
//     },
//     cartData: (state, { payload }) => {
//       state.cartItems = JSON.parse(localStorage.getItem("cart"));
//     },
//     calculateTotal: (state) => {
//       let total = 0;
//       state.cartItems.map((item) => {
//         total += parseInt(item.price);
//       });
//       state.total = total;
//       localStorage.setItem("total", JSON.stringify(state.total));
//     },
//   },
// });

// export const { addToCart, removeItem, clearCart, cartData, calculateTotal } =
//   cartSlice.actions;
// export default cartSlice.reducer;
