import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feature/user-slice";

const Store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;
// export type RootState = ReturnType<typeof rootReducer>

export default Store;
