import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/api";
import type { User, UserFormValues } from "../type/user";
import { toast } from "react-toastify";
import { QueryKeys } from "../constant/user.constant";
import { useUserUIStore } from "../../store/userStore";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { pageNumber } = useUserUIStore();
  return useMutation({
    mutationFn: (newUser: UserFormValues) => createUser(newUser),
    onSuccess: (res: User, newUser: UserFormValues) => {
      queryClient.setQueryData(
       [...QueryKeys.listUser, String(pageNumber)] ,
        (data: User[]) => {
          return [...data, { ...newUser, id: res.id }];
        }
      );
      //   queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(
        `New User ${res.firstName} ${res.lastName} added successfully`
      );
    },
      onError: () => {
      toast.error("Failed to Create user");
    },
  });
};
