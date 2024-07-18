import { useQuery } from "@tanstack/react-query";
import {
  asyncAddCategory,
  asyncGetAllCategory,
  asyncGetCategoryById,
  asyncSearchCategory,
  asyncEditCategory,
  TAddCategory,
} from "./fetchers";

export enum QueryKeys {
  CATEGORY = "category",
}

export const useGetAllCategory = () =>
  useQuery({
    queryKey: [QueryKeys.CATEGORY],
    queryFn: asyncGetAllCategory,
  });

export const useSingleCategory = (categoryId: number) =>
  useQuery({
    queryKey: [QueryKeys.CATEGORY, categoryId],
    queryFn: () => asyncGetCategoryById(categoryId),
  });

export const useSearchCategory = (categoryId: string) =>
  useQuery({
    queryKey: [QueryKeys.CATEGORY, categoryId],
    queryFn: () => asyncSearchCategory(categoryId),
  });

export const useAddCategory = (data: TAddCategory) =>
  useQuery({
    queryKey: [QueryKeys.CATEGORY, data],
    queryFn: () => asyncAddCategory(data),
  });

export const useUpdateCategory = (data: TAddCategory) =>
  useQuery({
    queryKey: [QueryKeys.CATEGORY, data],
    queryFn: () => asyncEditCategory(data),
  });
