import { axiosError } from "../../lib/axios-error";
import { API_FORM_URL, API_URL } from "../../redux/urlConfig";
import toast from "react-hot-toast";
import { TPackingResponse } from "../packing/fetchers";

export type TBasicResponse<T> = {
  data: T;
  metadata?: T;
};

export type TProductResponse = {
  id?: number;
  name: string;
  description?: string;
  price?: number;
  stock?: number;
  packing?: TPackingResponse;
  isShippingFree?: boolean;
  ml?: string;
  category?: {
    id?: number;
    name: string;
  };
  Brand?: {
    id?: number;
    name: string;
  };
  // packing?: {
  //   id?: number;
  //   price: number;
  //   image: string;
  //   color: string;
  // };
  taste?: {
    id?: number;
    name: string;
  };
  brandId?: number;
  tasteId?: number;
  packingId: number;
  productImage?: {
    id?: number;
    image: string;
  }[];
};

export type TAddProduct = {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  ml: string;
};

export const asyncGetAllProducts = async () => {
  try {
    const response = await API_URL.get(`/api/v1/products`);
    const data: TBasicResponse<TProductResponse[]> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncGetPaginationProducts = async (
  skip: number,
  take: number
) => {
  try {
    const response = await API_URL.get(
      `/api/v1/pagination-products?skip=${skip}&take=${take}`
    );
    const data: TBasicResponse<TProductResponse[]> = await response.data;
    return data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncGetProductsById = async (productId: number) => {
  try {
    const response = await API_URL.get(`/api/v1/product/${productId}`);
    const data: TBasicResponse<TProductResponse> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncSearchProducts = async (
  name: string,
  category: string,
  taste: string,
  brand: string,
  gender: string
) => {
  try {
    const response = await API_URL.get(
      `/api/v1/products/search?name=${name}&category=${category}&taste=${taste}&brand=${brand}&gender=${gender}`
    );
    const data: TBasicResponse<TProductResponse[]> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncAddProduct = async (data: TAddProduct) => {
  try {
    const product = await API_FORM_URL.post("/api/v1/product", data);
    toast.success("product added successful");
    return product.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncEditProduct = async (data: {
  formData: TAddProduct;
  id: number;
}) => {
  try {
    const product = await API_FORM_URL.patch(
      "/api/v1/product/" + data.id,
      data?.formData
    );
    toast.success("product updated successful");
    return product.data;
  } catch (error: any) {
    throw toast.error(axiosError(error));
  }
};

export const asyncDeleteProduct = async (productId: number) => {
  try {
    const response = await API_URL.delete(`/api/v1/product/${productId}`);
    const data: TBasicResponse<TProductResponse> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncGetNewArrivalProducts = async () => {
  try {
    const response = await API_URL.get(`/api/v1/new-arrival-products`);
    const data: TBasicResponse<TProductResponse[]> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncGetBestSellingProducts = async () => {
  try {
    const response = await API_URL.get(`/api/v1/best-selling-products`);
    const data: TBasicResponse<TProductResponse[]> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncGetSimilarProducts = async (categoryId: number) => {
  try {
    const response = await API_URL.get(
      `/api/v1/similar-products/${categoryId}`
    );
    const data: TBasicResponse<TProductResponse[]> = await response.data;
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
