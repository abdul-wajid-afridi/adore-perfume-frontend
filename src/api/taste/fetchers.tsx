import { axiosError } from "../../lib/axios-error";
import { API_FORM_URL, API_URL } from "../../redux/urlConfig";
import toast from "react-hot-toast";

export type TBasicResponse<T> = {
  data: T;
};

export type TTasteResponse = {
  id?: number;
  name: string;
  image: any;
};

export type TAddTaste = TTasteResponse;

export const asyncGetAllTaste = async () => {
  try {
    const response = await API_URL.get(`/api/v1/taste`);
    const data: TBasicResponse<TTasteResponse[]> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncGetTasteById = async (tasteId: number) => {
  try {
    const response = await API_URL.get(`/api/v1/single-taste/${tasteId}`);
    const data: TBasicResponse<TTasteResponse> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncAddTaste = async (data: TAddTaste) => {
  try {
    const Taste = await API_FORM_URL.post("/api/v1/taste", data);
    toast.success("Taste added successful");
    return Taste.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncEditTaste = async (data: {
  formData: TAddTaste;
  id: number;
}) => {
  try {
    const Taste = await API_FORM_URL.patch(
      "/api/v1/taste/" + data.id,
      // if editing then always check that its is form data.formData not only data because it create bugs and do not update data due passing id also in body
      data.formData
    );
    toast.success("Taste updated successful");
    return Taste.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncDeleteTaste = async (tasteId: number) => {
  try {
    const response = await API_URL.delete(`/api/v1/taste/${tasteId}`);
    const data: TBasicResponse<TTasteResponse> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};
