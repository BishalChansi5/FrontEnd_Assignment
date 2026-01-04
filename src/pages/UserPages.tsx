import UserList from "../users/components/UserList";
import { UserForm } from "../users/components/UserForm";
import type { User, UserFormValues } from "../users/type/user";
import { useUserUIStore } from "../store/userStore";
import { useCreateUser } from "../users/hook/useCreateUser";
import { useUpdateuser } from "../users/hook/useUpdateUser";
import { useGetAllUser, useGetUser } from "../users/hook/useGetUser";
import { useMemo, useState } from "react";

const UserPages = () => {
  const [disableButton, setDisableButton] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const { data, isLoading, error } = useGetUser();
  const { data: allUserData } = useGetAllUser();
  const { selectedUser, selectUser, toggleForm, pageNumber, setPageNumber } =
    useUserUIStore();
  const createUser = useCreateUser();
  const updateUser = useUpdateuser();
  const displayedUsers = useMemo(() => {
    const query = searchUser.trim().toLowerCase();

    if (!query) {
      return data ?? [];
    }
    return (allUserData ?? []).filter(
      (user) =>
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query)
    );
  }, [searchUser, data, allUserData]);
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
    setDisableButton(true);
    if (selectedUser) {
      updateUser.mutate(
        { id: selectedUser.id, data: values },
        {
          onSuccess: () => {
            resetForm();
            selectUser(null);
            toggleForm(false);
            setDisableButton(false);
          },
        }
      );
    } else {
      createUser.mutate(values, {
        onSuccess: () => {
          resetForm();
          setDisableButton(false);
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
          isLoading={disableButton}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center mb-3">
          <input
            type="text"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            placeholder="search user..."
            className="border rounded py-1 px-3"
          />
        </div>
        <h2 className="text-2xl font-semibold mb-4">User List</h2>

        <UserList users={displayedUsers} />
      </div>
      {!searchUser.trim() && (
        <div className="flex gap-4 items-center justify-center">
          <button
            disabled={pageNumber === 0}
            className={`p-2 rounded text-white ${
              pageNumber === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-400"
            }`}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Prev
          </button>

          <p>{pageNumber + 1}</p>

          <button
            className="bg-green-400 p-2 rounded text-white"
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UserPages;
