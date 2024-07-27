import { useQuery } from "@tanstack/react-query";
import { asyncGetAllPacking, asyncGetPackingById } from "./fetchers";

export enum QueryKeys {
  Packing = "packing",
}

export const useGetAllPacking = () =>
  useQuery({
    queryKey: [QueryKeys.Packing],
    queryFn: asyncGetAllPacking,
  });

export const useSinglePacking = (packingId: number) =>
  useQuery({
    queryKey: [QueryKeys.Packing, packingId],
    queryFn: () => asyncGetPackingById(packingId),
  });
