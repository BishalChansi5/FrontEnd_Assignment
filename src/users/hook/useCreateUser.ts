import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/api";
import type { User, UserFormValues } from "../type/user";
import { toast } from "react-toastify";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newUser: UserFormValues) => createUser(newUser),
    onSuccess: (res: User, newUser: UserFormValues) => {
      queryClient.setQueryData(["users"], (data: User[]) => {
        return [...data, { ...newUser, id: res.id }];
      });
      //   queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(
        `New User ${res.firstName} ${res.lastName} added successfully`
      );
    },
  });
};
