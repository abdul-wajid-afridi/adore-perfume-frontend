import { useQuery } from "@tanstack/react-query";
import { asyncGetAllReviews, asyncGetVisibleReviews } from "./fetchers";

export enum QueryKeys {
  REVIEWS = "reviews",
}

export const useGetAllReviews = () =>
  useQuery({
    queryKey: [QueryKeys.REVIEWS],
    queryFn: asyncGetAllReviews,
  });

export const useGetVisibleReviews = () =>
  useQuery({
    queryKey: [QueryKeys.REVIEWS],
    queryFn: asyncGetVisibleReviews,
  });
