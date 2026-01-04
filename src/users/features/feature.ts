import { queryOptions } from "@tanstack/react-query";
import { fetchAllUsers, fetchUser } from "../services/api";
import { useUserUIStore } from "../../store/userStore";
import { QueryKeys } from "../constant/user.constant";

export const viewUsers = () => {
  const { pageNumber } = useUserUIStore();
  return queryOptions({
    queryKey: [...QueryKeys.listUser, pageNumber.toString()],
    queryFn: fetchUser,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const viewAllUsers = () => {
  return queryOptions({
    queryKey: QueryKeys.listUser,
    queryFn: fetchAllUsers,
  });
};

// export const viewSearchUser = () => {
//   return queryOptions({
//     queryKey:['search']
//   })
// }