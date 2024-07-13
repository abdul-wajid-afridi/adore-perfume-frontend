// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { API_URL } from "../urlConfig";
// import axios, { AxiosError } from "axios";
// import { axiosError } from "../../lib/axios-error";

// // img types
// type InitProps = {
//   user: [];
//   editUser: boolean;
//   loading: boolean;
//   error: string | null;
// };

// const initialState: InitProps = {
//   user: [],
//   editUser: true,
//   loading: false,
//   error: null,
// };

// type TImage = {
//   id: string;
//   url: string;
//   // Add other fields as necessary
// };

// export const asyncGetAllImages = createAsyncThunk<
//   TImage[],
//   void,
//   { rejectValue: string }
// >("asyncGetAllImages/get", async (_, { rejectWithValue }) => {
//   try {
//     const res = await API_URL.get("/api_v1/images");
//     return res.data?.data;
//   } catch (error) {
//     return rejectWithValue(axiosError(error));
//   }
// });

// //  createUser
// export const asyncCreateUser: any = createAsyncThunk(
//   "asyncCreateUser/post",
//   async (data) => {
//     try {
//       const { toast, name, email, password, confirmPassword }: any = data;
//       const user = await API.post("user", {
//         name,
//         email,
//         password,
//         confirmPassword,
//       });
//       const result = await user.data;
//       toast.success("User Created");
//       return result;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
// // Get User
// export const asyncGetUser = createAsyncThunk("asyncGetUser/get", async () => {
//   try {
//     const user = await API.get("user");
//     const result = await user.data;
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// });
// // Delete User
// export const asyncDeleteUser = createAsyncThunk(
//   "asyncDeleteUser/delete",
//   async (data, { dispatch }) => {
//     try {
//       const { id, toast } = data;
//       const user = await API.delete(`user/${id}`);
//       const result = await user.data;
//       dispatch(asyncGetUser());
//       toast.success("User Deleted");
//       return result;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// // Update User
// export const asyncUpdateUser = createAsyncThunk(
//   "asyncUpdateUser/put",
//   async (data, { dispatch }) => {
//     try {
//       const { id, navigate, toast, name, email, password, confirmPassword } =
//         data;
//       const user = await API.put(`user/${id}`, {
//         id,
//         name,
//         email,
//         password,
//         confirmPassword,
//       });
//       const result = await user.data;
//       dispatch(asyncGetUser());
//       toast.success("User Updated");
//       setTimeout(() => {
//         return navigate("/");
//       }, [1000]);
//       return result;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// // Log In User

// const userSlice = createSlice({
//   name: "userSlice",
//   reducers: {
//     RemoveEditUser: (state) => {
//       state.editUser = null;
//     },
//   },
//   extraReducers: {
//     // create User
//     [asyncCreateUser.pending]: (state) => {
//       state.error = null;
//       state.laoding = true;
//     },
//     [asyncCreateUser.fulfilled]: (state, { payload }) => {
//       state.laoding = false;
//       state.error = null;
//       state.user = payload;
//     },
//     [asyncCreateUser.rejected]: (state, { payload }) => {
//       state.error = payload;
//       state.laoding = false;
//     },
//     // get user
//     [asyncGetUser.pending]: (state) => {
//       state.error = null;
//       state.laoding = true;
//     },
//     [asyncGetUser.fulfilled]: (state, { payload }) => {
//       state.laoding = false;
//       state.error = null;
//       state.user = payload;
//     },
//     [asyncGetUser.rejected]: (state, { payload }) => {
//       state.error = payload;
//       state.laoding = false;
//     },
//     // delete user
//     [asyncDeleteUser.pending]: (state) => {
//       state.error = null;
//       state.laoding = true;
//     },
//     [asyncDeleteUser.fulfilled]: (state, { payload }) => {
//       state.laoding = false;
//       state.error = null;
//       state.user = payload;
//     },
//     [asyncDeleteUser.rejected]: (state, { payload }) => {
//       state.error = payload;
//       state.laoding = false;
//     },
//     // Update User
//     [asyncUpdateUser.pending]: (state) => {
//       state.error = null;
//       state.laoding = true;
//     },
//     [asyncUpdateUser.fulfilled]: (state, { payload }) => {
//       state.laoding = false;
//       state.error = null;
//       state.user = payload;
//     },
//     [asyncUpdateUser.rejected]: (state, { payload }) => {
//       state.error = payload;
//       state.laoding = false;
//     },
//   },
// });

// export const { RemoveEditUser } = userSlice.actions;
// export default userSlice.reducer;
