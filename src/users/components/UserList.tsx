import React from "react";
import type { User } from "../type/user";
import { useUserUIStore } from "../../store/userStore";
import { useDeleteUser } from "../hook/useDeleteUser";
import { toast } from "react-toastify";

const UserList = ({ users }: { users: User[] }) => {
  const { selectUser, toggleForm } = useUserUIStore();
  const deleteUser = useDeleteUser();
  if (!users.length) {
    return <p>No users found.</p>;
  }
  const handleEdit = (user: User) => {
    selectUser(user);
    toggleForm(true);
  };
  const handleDelete = (id: string) => {
    deleteUser.mutate(id);
    toast.success("User deleted successfully");
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Email
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Age
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Address
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {users.map((user, idx) => (
            <tr
              key={user.id}
              className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="px-4 py-2 text-sm text-gray-700">
                {user.firstName} {user.lastName}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">{user.email}</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {user.age ?? "-"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {user.address ?? "-"}
              </td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
