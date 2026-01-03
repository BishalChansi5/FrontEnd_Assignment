import { queryOptions } from "@tanstack/react-query";
import { fetchUser } from "../services/api";
import { QueryKeys } from "../constant/user.constant";

export const viewUsers = () => {
  return queryOptions({
    queryKey: QueryKeys.listUser,
    queryFn: fetchUser,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
