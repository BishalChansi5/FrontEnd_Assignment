import { useQuery } from "@tanstack/react-query";
import { viewAllUsers, viewUsers } from "../features/feature";

export const useGetUser = () => {
  const { data, isLoading, error } = useQuery(viewUsers());
  return { data, isLoading, error };
};

export const useGetAllUser = () => {
  const { data } = useQuery(viewAllUsers());
  return { data };
};

// export const useGetSearchUser = () => {
//       const { data } = useQuery(viewAllUsers());
// }