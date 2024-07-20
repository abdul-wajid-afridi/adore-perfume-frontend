import { useQuery } from "@tanstack/react-query";
import { asyncGetAllOrders, asyncGetOrderById } from "./fetchers";

export enum QueryKeys {
  ORDERS = "orders",
}

export const useGetAllOrders = () =>
  useQuery({
    queryKey: [QueryKeys.ORDERS],
    queryFn: asyncGetAllOrders,
  });

export const useGetOrdersById = (orderId: number) =>
  useQuery({
    queryKey: [QueryKeys.ORDERS, orderId],
    queryFn: () => asyncGetOrderById(orderId),
  });
