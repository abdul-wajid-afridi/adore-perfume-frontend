import { axiosError } from "../../lib/axios-error";
import { API_FORM_URL, API_URL } from "../../redux/urlConfig";
import toast from "react-hot-toast";

export type TBasicResponse<T> = {
  data: T;
  metadata?: T;
};

export type TGiftBoxResponse = {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  ml?: string;
  image?: string;
};

export type TAddGiftBox = {
  id?: number;
  name: string;
  description?: string;
  price?: number;
  stock?: number;
  ml?: string;
};

export const asyncGetAllGiftBoxes = async () => {
  try {
    const response = await API_URL.get(`/api/v1/gift-box`);
    const data: TBasicResponse<TGiftBoxResponse[]> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncGetGiftBoxesById = async (giftBoxId: number) => {
  try {
    const response = await API_URL.get(`/api/v1/gift-box/${giftBoxId}`);
    const data: TBasicResponse<TGiftBoxResponse> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncAddGiftBox = async (data: TAddGiftBox) => {
  try {
    const GiftBox = await API_FORM_URL.post("/api/v1/gift-box", data);
    toast.success("GiftBox added successful");
    return GiftBox.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncEditGiftBox = async (data: {
  formData: TAddGiftBox;
  id: number;
}) => {
  try {
    const GiftBox = await API_FORM_URL.patch(
      "/api/v1/gift-box/" + data.id,
      data?.formData
    );
    toast.success("GiftBox updated successful");
    return GiftBox.data;
  } catch (error: any) {
    throw toast.error(axiosError(error));
  }
};

export const asyncDeleteGiftBox = async (giftBoxId: number) => {
  try {
    const response = await API_URL.delete(`/api/v1/gift-box/${giftBoxId}`);
    const data: TBasicResponse<TGiftBoxResponse> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};
