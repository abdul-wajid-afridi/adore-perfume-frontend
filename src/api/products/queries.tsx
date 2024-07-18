import { useQuery } from "@tanstack/react-query";
import {
  asyncAddProduct,
  // asyncDeleteProduct,
  // asyncEditProduct,
  asyncGetAllProducts,
  asyncGetBestSellingProducts,
  asyncGetNewArrivalProducts,
  asyncGetPaginationProducts,
  asyncGetProductsById,
  asyncGetSimilarProducts,
  asyncSearchProducts,
  TAddProduct,
} from "./fetchers";

export enum QueryKeys {
  PRODUCTS = "products",
}

export const useGetAllProducts = () =>
  useQuery({
    queryKey: [QueryKeys.PRODUCTS, "useGetAllProducts"],
    queryFn: () => asyncGetAllProducts(),
  });

export const useGetPaginationProducts = (skip: number, take: number) =>
  useQuery({
    queryKey: [QueryKeys.PRODUCTS, "useGetPaginationProducts", skip, take],
    queryFn: () => asyncGetPaginationProducts(skip, take),
  });

export const useGetProductById = (productId: number) =>
  useQuery({
    queryKey: [QueryKeys.PRODUCTS, productId],
    queryFn: () => asyncGetProductsById(productId),
  });

export const useSearchProducts = (productId: string) =>
  useQuery({
    queryKey: [QueryKeys.PRODUCTS, productId],
    queryFn: () => asyncSearchProducts(productId),
  });

export const useAddProduct = (data: TAddProduct) =>
  useQuery({
    queryKey: [QueryKeys.PRODUCTS, data],
    queryFn: () => asyncAddProduct(data),
  });

export const useGetNewArrivalProduct = () =>
  useQuery({
    queryKey: [QueryKeys.PRODUCTS, "asyncGetNewArrivalProducts"],
    queryFn: () => asyncGetNewArrivalProducts(),
  });

export const useGetBestSellingProducts = () =>
  useQuery({
    queryKey: [QueryKeys.PRODUCTS, "asyncGetBestSellingProducts"],
    queryFn: () => asyncGetBestSellingProducts(),
  });

export const useGetSimilarProducts = (categoryId: number) =>
  useQuery({
    queryKey: [QueryKeys.PRODUCTS, categoryId, "asyncGetSimilarProducts"],
    queryFn: () => asyncGetSimilarProducts(categoryId),
  });

// export const useEditProduct = (data: TAddProduct) =>
//   useQuery({
//     queryKey: [QueryKeys.PRODUCTS, data],
//     queryFn: () => asyncEditProduct(data),
//   });

// export const useDeleteProduct = (productId: number) =>
//   useQuery({
//     queryKey: [QueryKeys.PRODUCTS, productId],
//     queryFn: () => asyncDeleteProduct(productId),
//   });
