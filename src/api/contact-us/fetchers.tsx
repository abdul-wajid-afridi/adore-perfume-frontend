import { axiosError } from "../../lib/axios-error";
import { API_URL } from "../../redux/urlConfig";
import toast from "react-hot-toast";

export type TBasicResponse<T> = {
  data: T;
};

export type TContactUsResponse = {
  id?: number;
  name: string;
  subject?: string;
  message: string;
};

export type TAddContactUs = TContactUsResponse;

export const asyncGetAllContactUs = async () => {
  try {
    const response = await API_URL.get(`/api/v1/contact-us`);
    const data: TBasicResponse<TContactUsResponse[]> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncAddContactUs = async (data: TAddContactUs) => {
  try {
    const ContactUs = await API_URL.post("/api/v1/contact-us", data);
    toast.success("ContactUs added successful");
    return ContactUs.data;
  } catch (error: any) {
    throw toast.error(
      error.response?.data.error?.meta?.target || "An unknown error occurred."
    );
  }
};

export const asyncDeleteContactUs = async (ContactUsId: number) => {
  try {
    const response = await API_URL.delete(`/api/v1/contact-us/${ContactUsId}`);
    const data: TBasicResponse<TContactUsResponse> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};
