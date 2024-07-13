import axios from "axios";
import { BASE_URL } from "../constants/urls";

const getAuthToken = () => localStorage.getItem("token");
export const API_URL = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

API_URL.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// export const API_FORM_URL = axios.create({
//   baseURL: BASE_URL,
//   // withCredentials: true,

//   headers: {
//     token: `${token}`,
//     "content-type": "multipart/form-data",
//   },
// });
