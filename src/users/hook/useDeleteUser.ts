import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../services/api";
import type { User } from "../type/user";
import { QueryKeys } from "../constant/user.constant";
import { useUserUIStore } from "../../store/userStore";
import { toast } from "react-toastify";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { pageNumber } = useUserUIStore();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: (res, id) => {
      queryClient.setQueryData(
        [...QueryKeys.listUser, String(pageNumber)],
        (data: User[]) => {
          return data.filter((user) => user.id !== id);
        }
      );
      // queryClient.invalidateQueries({queryKey:['users']})
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });
};
