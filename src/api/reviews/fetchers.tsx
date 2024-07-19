import { axiosError } from "../../lib/axios-error";
import { API_FORM_URL, API_URL } from "../../redux/urlConfig";
import toast from "react-hot-toast";

export type TBasicResponse<T> = {
  data: T;
};

export type TReviewsResponse = {
  id?: number;
  name: string;
  email: string;
  stars: number;
  message: string;
  image?: string;
  isVisible?: boolean;
};

export type TAddReviews = TReviewsResponse;

export const asyncGetAllReviews = async () => {
  try {
    const response = await API_URL.get(`/api/v1/reviews`);
    const data: TBasicResponse<TReviewsResponse[]> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncGetVisibleReviews = async () => {
  try {
    const response = await API_URL.get(`/api/v1/visible-reviews`);
    const data: TBasicResponse<TReviewsResponse[]> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncAddReviews = async (data: TAddReviews) => {
  try {
    const Reviews = await API_FORM_URL.post("/api/v1/reviews", data);
    toast.success("Reviews added successful");
    return Reviews.data;
  } catch (error: any) {
    throw toast.error(
      error.response?.data.error?.meta?.target || "An unknown error occurred."
    );
  }
};

export const asyncDeleteReviews = async (reviewsId: number) => {
  try {
    const response = await API_URL.delete(`/api/v1/reviews/${reviewsId}`);
    const data: TBasicResponse<TReviewsResponse> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};

export const asyncUpdateReviews = async (reviews: {
  reviewsId: number;
  isVisible: boolean;
}) => {
  try {
    const response = await API_URL.patch(
      `/api/v1/reviews/${reviews.reviewsId}`,
      {
        isVisible: reviews.isVisible,
      }
    );
    const data: TBasicResponse<TReviewsResponse> = await response.data;
    return data.data;
  } catch (error) {
    throw toast.error(axiosError(error));
  }
};
