import { axiosError } from "../../lib/axios-error";
import { API_URL } from "../../redux/urlConfig";
import toast from "react-hot-toast";

export type TBasicResponse<T> = {
  data: T;
};

export type TUser = {
  id?: number;
  name?: string;
  email: string;
  phoneNo?: string;
  role?: string;
  status?: string;
};

export const getAllUsers = async () => {
  try {
    const response = await API_URL.get(`/api/v1/users`);
    const data: TBasicResponse<TUser[]> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const getUserById = async (userID: string) => {
  try {
    const response = await API_URL.get(`/api/v1/single-user/${userID}`);
    const data: TBasicResponse<TUser> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncLoginUsers = async (data: TUser) => {
  try {
    const loginUser = await API_URL.post("/api/v1/login", data);
    localStorage.setItem("token", loginUser.data.token);
    localStorage.setItem("user", JSON.stringify(loginUser.data.data));
    return loginUser.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncCreateUsers = async (data: TUser) => {
  try {
    const loginUser = await API_URL.post("/api/v1/user", data);
    toast.success("Registration successful");
    return loginUser.data;
  } catch (error: any) {
    throw toast.error(
      error.response?.data.error?.meta?.target || "An unknown error occurred."
    );
  }
};

export const asyncDeleteUser = async (userID: number) => {
  try {
    const response = await API_URL.delete(`/api/v1/user/${userID}`);
    const data: TBasicResponse<TUser> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncUpdateUser = async (userData: {
  data: TUser;
  userID: number;
}) => {
  console.log(userData);

  try {
    const response = await API_URL.patch(
      `/api/v1/user/${userData.userID}`,
      userData.data
    );
    toast.success("user updated successful");
    const data: TBasicResponse<TUser> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

// const loginUserMutation = useMutation({
//   mutationFn: asyncLoginUsers,
//   onSuccess: (data) => {
//     navigate("/cart");
//   },
// });

// *********************************** what is dehydration means in RTQ ***********************************

// import {
//   HydrationBoundary,
//   QueryClient,
//   dehydrate,
// } from "@tanstack/react-query";
// import { prefetchSingleNews } from "@/api/news/queries";
// import { NewsDetails } from "@/components/news-details/NewsDetails";

// type Params = {
//   id: string;
// };

// export const NewsDetailsPage = async ({ params }: { params: Params }) => {
//   const queryClient = new QueryClient();

//   await prefetchSingleNews(queryClient, params.id);

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <NewsDetails newsId={params.id} />
//     </HydrationBoundary>
//   );
// };

// export default NewsDetailsPage;
