import { useQuery } from "@tanstack/react-query";
import {
  asyncAddProduct,
  // asyncDeleteProduct,
  // asyncEditProduct,
  asyncGetAllProducts,
  asyncGetProductsById,
  asyncSearchProducts,
  TAddProduct,
} from "./fetchers";

export enum QueryKeys {
  PRODUCTS = "products",
}

export const useGetAllProducts = () =>
  useQuery({
    queryKey: [QueryKeys.PRODUCTS],
    queryFn: asyncGetAllProducts,
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
