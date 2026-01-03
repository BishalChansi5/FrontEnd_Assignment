import axios from "axios";
import type { ApiUser } from "../type/user.api";
import type { User, UserFormValues } from "../type/user";
import { mapUserFromApi } from "./user.mapper";

interface UsersResponse {
  users: ApiUser[];
  total: number;
  skip: number;
  limit: number;
}
const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const fetchUser = async (): Promise<User[]> => {
  const res = await api.get<UsersResponse>("/users");
  return res.data.users.map(mapUserFromApi);
};
export const createUser = async (data: UserFormValues) => {
  const res = await api.post("/users/add", data);
  return res.data;
};

export const updateUser = async ({
  id,
  data,
}: {
  id: string;
  data: UserFormValues;
}) => {
  const res = await api.put(`/users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: string) => {
  return api.delete(`/users/${id}`);
};