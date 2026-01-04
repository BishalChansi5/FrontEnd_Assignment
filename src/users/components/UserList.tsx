import React, { useEffect, useState } from "react";
import type { User } from "../type/user";
import { useUserUIStore } from "../../store/userStore";
import { useDeleteUser } from "../hook/useDeleteUser";
import { toast } from "react-toastify";

const UserList = ({ users }: { users: User[] }) => {
  const [flag, setFlag] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const { selectUser, toggleForm } = useUserUIStore();
  const deleteUser = useDeleteUser();
  useEffect(() => {
    window.scroll(0, 0);
  }, [flag]);
  if (!users.length) {
    return <p>No users found.</p>;
  }
  const handleEdit = (user: User) => {
    selectUser(user);
    toggleForm(true);
    setFlag(!flag);
  };
  const confirmDelete = () => {
    if (!confirmId) return;

    deleteUser.mutate(confirmId, {
      onSuccess: () => {
        toast.success("User deleted successfully");
        setConfirmId(null);
      },
      onError: () => {
        toast.error("Failed to delete user");
      },
    });
  };

  const cancelDelete = () => setConfirmId(null);

  return (
    <div className="overflow-x-auto">
      {confirmId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

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
                  className="px-3 py-1 bg-green-400 text-white rounded hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => setConfirmId(user.id)}
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
