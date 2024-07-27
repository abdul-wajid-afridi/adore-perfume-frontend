import { useQuery } from "@tanstack/react-query";
import { asyncGetAllBrand, asyncGetBrandById } from "./fetchers";

export enum QueryKeys {
  BRAND = "brand",
}

export const useGetAllBrand = () =>
  useQuery({
    queryKey: [QueryKeys.BRAND],
    queryFn: asyncGetAllBrand,
  });

export const useSingleBrand = (brandId: number) =>
  useQuery({
    queryKey: [QueryKeys.BRAND, brandId],
    queryFn: () => asyncGetBrandById(brandId),
  });
