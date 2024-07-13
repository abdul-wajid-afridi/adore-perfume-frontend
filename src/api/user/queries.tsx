import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getUserById } from "./fetchers";

enum QueryKeys {
  USERS = "users",
}

export const useUsers = () =>
  useQuery({
    queryKey: [QueryKeys.USERS],
    queryFn: getAllUsers,
  });

// what is prefetch in tanstack query
// export const prefetchUsers = async (queryClient: QueryClient) =>
//   await queryClient.prefetchQuery({
//     queryKey: [QueryKeys.USERS],
//     queryFn: getAllUsers,
//   });

export const useSingleUser = (userId: string) =>
  useQuery({
    queryKey: [QueryKeys.USERS, userId],
    queryFn: () => getUserById(userId),
  });

// export const prefetchSingleUser = async (
//   queryClient: QueryClient,
//   userId: string
// ) =>
//   await queryClient.prefetchQuery({
//     queryKey: [QueryKeys.USERS, userId],
//     queryFn: () => getUserById(userId),
//   });
