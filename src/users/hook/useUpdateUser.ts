import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../services/api";
import type { User, UserFormValues } from "../type/user";
import { toast } from "react-toastify";
import { QueryKeys } from "../constant/user.constant";
import { useUserUIStore } from "../../store/userStore";

export const useUpdateuser = () => {
  const queryClient = useQueryClient();
  const { pageNumber } = useUserUIStore();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UserFormValues }) =>
      updateUser({ id, data }),
    onSuccess: (res: User, { id, data }) => {
      // console.log(res);
      queryClient.setQueryData(
        [...QueryKeys.listUser, String(pageNumber)],
        (userList: User[]) => {
          return userList.map((user) => (user.id === id ? { ...data } : user));
        }
      );
      //   queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.setQueryData(QueryKeys.listUser, (oldData?: User[]) =>
        oldData?.map((user) => (user.id === id ? { ...data } : user))
      );
      toast.success(`User Updated successfully`);
    },
    onError: () => {
      toast.error("Failed to Update user");
    },
  });
};
