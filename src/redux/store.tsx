import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feature/user-slice";
import cartSlice from "./feature/cartSlice";

const Store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;
// export type RootState = ReturnType<typeof rootReducer>

export default Store;
