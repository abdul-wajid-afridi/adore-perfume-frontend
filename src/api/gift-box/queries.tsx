import { useQuery } from "@tanstack/react-query";

import { asyncGetAllGiftBoxes, asyncGetGiftBoxesById } from "./fetchers";

export enum QueryKeys {
  GIFT_BOX = "gift_box",
}

export const useGetAllGiftBoxes = () =>
  useQuery({
    queryKey: [QueryKeys.GIFT_BOX, "useGetAllGiftBoxes"],
    queryFn: () => asyncGetAllGiftBoxes(),
  });

export const useGetGiftBoxById = (giftBoxId: number) =>
  useQuery({
    queryKey: [QueryKeys.GIFT_BOX, giftBoxId],
    queryFn: () => asyncGetGiftBoxesById(giftBoxId),
  });
