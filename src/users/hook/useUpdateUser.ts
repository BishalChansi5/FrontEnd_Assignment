import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../services/api";
import type { User, UserFormValues } from "../type/user";
import { toast } from "react-toastify";

export const useUpdateuser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UserFormValues }) =>
      updateUser({ id, data }),
    onSuccess: (res: User, { id, data }) => {
      console.log(res);
      queryClient.setQueryData(["users"], (userList: User[]) => {
        return userList.map((user) => (user.id === id ? { ...data } : user));
      });
      //   queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(`User Updated successfully`);
    },
  });
};
