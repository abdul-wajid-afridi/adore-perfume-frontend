import { axiosError } from "../../lib/axios-error";
import { API_FORM_URL, API_URL } from "../../redux/urlConfig";
import toast from "react-hot-toast";

export type TBasicResponse<T> = {
  data: T;
};

export type TPackingResponse = {
  id?: number;
  name: string;
  price: number;
  color?: number;
  image: any;
};

export type TAddPacking = TPackingResponse;
export type TCustomizeProductPacking = {
  productId: number;
  packingId: number;
  name: string;
};

export const asyncGetAllPacking = async () => {
  try {
    const response = await API_URL.get(`/api/v1/packing`);
    const data: TBasicResponse<TPackingResponse[]> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncGetPackingById = async (packingId: number) => {
  try {
    const response = await API_URL.get(`/api/v1/single-Packing/${packingId}`);
    const data: TBasicResponse<TPackingResponse> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncAddPacking = async (data: TAddPacking) => {
  try {
    const Packing = await API_FORM_URL.post("/api/v1/packing", data);
    toast.success("Packing added successful");
    return Packing.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncCustomizeProductPacking = async (
  data: TCustomizeProductPacking
) => {
  try {
    const Packing = await API_URL.post("/api/v1/customize-packing", data);
    // toast.success("Packing added successful");
    return Packing.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncUpdatePacking = async (data: {
  packingId: number;
  data: TAddPacking;
}) => {
  try {
    const Packing = await API_URL.patch(
      "/api/v1/packing/" + data.packingId,
      data.data
    );
    // toast.success("Packing updated successful");
    return Packing.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncDeletePacking = async (packingId: number) => {
  try {
    const response = await API_URL.delete(`/api/v1/packing/${packingId}`);
    const data: TBasicResponse<TPackingResponse> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};
