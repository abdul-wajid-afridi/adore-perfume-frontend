import { axiosError } from "../../lib/axios-error";
import { API_URL } from "../../redux/urlConfig";
import toast from "react-hot-toast";

export type TBasicResponse<T> = {
  data: T;
};

export type TBrandResponse = {
  id?: number;
  name: string;
};

export type TAddBrand = TBrandResponse;

export const asyncGetAllBrand = async () => {
  try {
    const response = await API_URL.get(`/api/v1/brand`);
    const data: TBasicResponse<TBrandResponse[]> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncGetBrandById = async (brandId: number) => {
  try {
    const response = await API_URL.get(`/api/v1/single-brand/${brandId}`);
    const data: TBasicResponse<TBrandResponse> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncAddBrand = async (data: TAddBrand) => {
  try {
    const Brand = await API_URL.post("/api/v1/brand", data);
    toast.success("Brand added successful");
    return Brand.data;
  } catch (error: any) {
    throw toast.error(axiosError(error));
  }
};

export const asyncEditBrand = async (data: TAddBrand) => {
  try {
    const Brand = await API_URL.patch("/api/v1/brand/" + data.id, data);
    toast.success("Brand updated successful");
    return Brand.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncDeleteBrand = async (brandId: number) => {
  try {
    const response = await API_URL.delete(`/api/v1/brand/${brandId}`);
    const data: TBasicResponse<TBrandResponse> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};
