import { useQuery } from "@tanstack/react-query";
import {
  asyncAddContactUs,
  asyncGetAllContactUs,
  TAddContactUs,
} from "./fetchers";

export enum QueryKeys {
  CONTACT_US = "contact-us",
}

export const useGetAllContactUs = () =>
  useQuery({
    queryKey: [QueryKeys.CONTACT_US],
    queryFn: asyncGetAllContactUs,
  });

export const useAddContactUs = (data: TAddContactUs) =>
  useQuery({
    queryKey: [QueryKeys.CONTACT_US, data],
    queryFn: () => asyncAddContactUs(data),
  });
