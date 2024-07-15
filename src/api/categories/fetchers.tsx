import { axiosError } from "../../lib/axios-error";
import { API_URL } from "../../redux/urlConfig";
import toast from "react-hot-toast";

export type TBasicResponse<T> = {
  data: T;
};

export type TCategoryResponse = {
  id?: number;
  name: string;
};

export type TAddCategory = TCategoryResponse;

export const asyncGetAllCategory = async () => {
  try {
    const response = await API_URL.get(`/api/v1/category`);
    const data: TBasicResponse<TCategoryResponse[]> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncGetCategoryById = async (categoryId: number) => {
  try {
    const response = await API_URL.get(`/api/v1/category/${categoryId}`);
    const data: TBasicResponse<TCategoryResponse> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncSearchCategory = async (query: string) => {
  try {
    const response = await API_URL.get(`/api/v1/category/search?query${query}`);
    const data: TBasicResponse<TCategoryResponse> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncAddCategory = async (data: TAddCategory) => {
  try {
    const Category = await API_URL.post("/api/v1/category", data);
    return Category.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncUpdateCategory = async (data: TAddCategory) => {
  try {
    const Category = await API_URL.put("/api/v1/category/" + data.id, data);
    toast.success("Registration successful");
    return Category.data;
  } catch (error: any) {
    throw toast.error(axiosError(error));
  }
};

export const asyncDeleteCategory = async (categoryId: number) => {
  try {
    const response = await API_URL.delete(`/api/v1/category/${categoryId}`);
    const data: TBasicResponse<TCategoryResponse> = await response.data;
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
