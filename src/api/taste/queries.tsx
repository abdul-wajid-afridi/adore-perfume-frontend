import { useQuery } from "@tanstack/react-query";
import { asyncGetAllTaste, asyncGetTasteById } from "./fetchers";

export enum QueryKeys {
  TASTE = "taste",
}

export const useGetAllTaste = () =>
  useQuery({
    queryKey: [QueryKeys.TASTE],
    queryFn: asyncGetAllTaste,
  });

export const useSingleTaste = (tasteId: number) =>
  useQuery({
    queryKey: [QueryKeys.TASTE, tasteId],
    queryFn: () => asyncGetTasteById(tasteId),
  });
