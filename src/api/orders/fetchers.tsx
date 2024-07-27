import { axiosError } from "../../lib/axios-error";
import { API_URL } from "../../redux/urlConfig";
import toast from "react-hot-toast";

export type TBasicResponse<T> = {
  data: T;
};

export type TOrdersResponse = {
  id?: number;
  name: string;
  email: string;
  address: string;
  country: string;
  phoneNo: string;
  city: string;
  amount: number;
  cartItems: {
    quantity: number;
    productId: number;
  };
};

export type TCreateOrders = TOrdersResponse;

export const asyncGetAllOrders = async () => {
  try {
    const response = await API_URL.get(`/api/v1/all-orders`);
    const data: TBasicResponse<TOrdersResponse[]> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncGetOrderById = async (orderId: number) => {
  try {
    const response = await API_URL.get(`/api/v1/orders/${orderId}`);
    const data: TBasicResponse<TOrdersResponse[]> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncCreateOrders = async (data: TCreateOrders) => {
  try {
    const Orders = await API_URL.post("/api/v1/orders", data);
    toast.success("Orders added successful");
    return Orders.data;
  } catch (error: any) {
    throw toast.error(
      error.response?.data.error?.meta?.target || "An unknown error occurred."
    );
  }
};

export const asyncUpdateOrdersStatus = async (data: any) => {
  try {
    const Orders = await API_URL.patch(`/api/v1/orders/${data.id}/status`, {
      status: data.status,
    });
    return Orders.data;
  } catch (error: any) {
    throw toast.error(
      error.response?.data.error?.meta?.target || "An unknown error occurred."
    );
  }
};

export const asyncDeleteOrders = async (OrdersId: number) => {
  try {
    const response = await API_URL.delete(`/api/v1/orders/${OrdersId}`);
    const data: TBasicResponse<TOrdersResponse> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};
