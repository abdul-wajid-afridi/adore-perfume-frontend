import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { API_URL } from "../urlConfig";
import { axiosError } from "../../lib/axios-error";
import { Dispatch, SetStateAction } from "react";

export type TLoginData = {
  user: {
    id?: number;
    email: string;
    password: string;
    role: string;
    phoneNo?: string;
    status?: string;
  };
  navigate: (path: string) => void | boolean;
  toast: any;
};

export interface TSignUpData extends TLoginData {
  setActiveTab: Dispatch<SetStateAction<string>>;
  reset: any;
}

export type TUser = {
  id: string;
  name: string;
  email: string;
  phoneNo: string;
  role: string;
  status: string;
}[];

export type TLoginResponse = {
  token: string;
  data: TUser;
};

export type TUserData = TLoginResponse;

export type TUserSliceState = {
  loading: boolean;
  error: string | null;
  user: TUser | null;
  token: string | null;
};

export const asyncLoginUsers = createAsyncThunk<
  TLoginResponse,
  TLoginData,
  { rejectValue: string }
>("asyncLoginUsers", async function asyncLoginUsers(data) {
  try {
    const loginUser = await API_URL.post<TLoginResponse>(
      "/api/v1/login",
      data.user
    );

    localStorage.setItem("token", loginUser.data.token);
    localStorage.setItem("user", JSON.stringify(loginUser.data.data));
    data.navigate("/dashboard");
    return loginUser.data;
  } catch (error) {
    return data.toast(axiosError(error));
  }
});

export const asyncCreateUser = createAsyncThunk<
  TUser,
  TSignUpData,
  { rejectValue: string }
>("asyncCreateUser", async function asyncCreateUser(data) {
  try {
    const loginUser = await API_URL.post<TUser>("/api/v1/user", data.user);

    data.toast("user Registered successful");
    data.reset();
    data.setActiveTab("login");

    return loginUser.data;
  } catch (error) {
    return data.toast(axiosError(error));
  }
});

export const asyncGetAllUsers = createAsyncThunk<
  TUserData,
  void,
  { rejectValue: string }
>("asyncGetAllUsers", async function asyncGetAllUsers(_, { rejectWithValue }) {
  try {
    const loginUser = await API_URL.get<TUserData>("/api/v1/users");
    return loginUser.data;
  } catch (error) {
    return rejectWithValue(axiosError(error));
  }
});

export const asyncLogoutUsers = createAsyncThunk<
  { message: string },
  void,
  any
>("asyncLogoutUsers", async function asyncLogoutUsers(_, { rejectWithValue }) {
  try {
    const loginUser = await API_URL.post<{ message: string }>("/api/v1/logout");
    // we will test if token is removed does it redirects auto
    // data.navigate("/");
    return loginUser.data;
  } catch (error) {
    return rejectWithValue(axiosError(error));
  }
});

const initialState: TUserSliceState = {
  loading: false,
  error: null,
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncLoginUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        asyncLoginUsers.fulfilled,
        (state, action: PayloadAction<TLoginResponse>) => {
          state.loading = false;
          state.user = action.payload.data;
          state.token = action.payload.token;
          state.error = null;
        }
      )
      .addCase<any>(
        asyncLoginUsers.rejected,
        (state, { payload }: PayloadAction<string>) => {
          state.loading = false;
          state.error = payload || "Failed to login";
        }
      );

    // get users
    builder
      .addCase(asyncGetAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        asyncGetAllUsers.fulfilled,
        (state, action: PayloadAction<TUserData>) => {
          state.loading = false;
          state.user = action.payload.data;
          state.token = action.payload.token;
          state.error = null;
        }
      )
      .addCase<any>(
        asyncGetAllUsers.rejected,
        (state, { payload }: PayloadAction<string>) => {
          state.loading = false;
          state.error = payload || "Failed to login";
        }
      );

    // create user
    builder
      .addCase(asyncCreateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        asyncCreateUser.fulfilled,
        (state, action: PayloadAction<TUserData>) => {
          state.loading = false;
          // state.user = action.payload.data;
          // state.token = action.payload.token;
          state.error = null;
        }
      )
      .addCase<any>(
        asyncCreateUser.rejected,
        (state, { payload }: PayloadAction<string>) => {
          state.loading = false;
          state.error = payload || "Failed to login";
        }
      );
  },
});

export default userSlice.reducer;
