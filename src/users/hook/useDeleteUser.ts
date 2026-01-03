import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../services/api";
import type { User } from "../type/user";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: (res, id) => {
      queryClient.setQueryData(["users"], (data: User[]) => {
        return data.filter((user) => user.id !== id);
      });
      // queryClient.invalidateQueries({queryKey:['users']})
    },
  });
};
