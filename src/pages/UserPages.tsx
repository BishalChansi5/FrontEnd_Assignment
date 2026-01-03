import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { viewUsers } from "../users/features/feature";
import UserList from "../users/components/UserList";
import { UserForm } from "../users/components/UserForm";
import type { UserFormValues } from "../users/type/user";
import { useUserUIStore } from "../store/userStore";
import { createUser } from "../users/services/api";
import { useCreateUser } from "../users/hook/useCreateUser";
import { useUpdateuser } from "../users/hook/useUpdateUser";

const UserPages = () => {
  const { data, isLoading, error } = useQuery(viewUsers());
  const { selectedUser, selectUser, toggleForm } = useUserUIStore();
  const createUser = useCreateUser();
  const updateUser = useUpdateuser();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        {(error as Error).message}
      </div>
    );
  const handleSubmit = (values: UserFormValues, resetForm: () => void) => {
    if (selectedUser) {
      updateUser.mutate(
        { id: selectedUser.id, data: values },
        {
          onSuccess: () => {
            resetForm();
            selectUser(null);
            toggleForm(false);
          },
        }
        
      );
    } else {
      createUser.mutate(values, {
        onSuccess: () => {
          resetForm();
        },
      });
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Add New User
        </h2>
        <UserForm
          initialValues={
            selectedUser ?? {
              firstName: "",
              lastName: "",
              email: "",
              age: "",
            }
          }
          onSubmit={handleSubmit}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">User List</h2>
        <UserList users={data ?? []} />
      </div>
    </div>
  );
};

export default UserPages;
