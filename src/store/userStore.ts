import { create } from "zustand";
import type { User } from "../users/type/user";

type UserUIState = {
  selectedUser: User | null;
  toggle: boolean;
  pageNumber: number;
  selectUser: (user: User | null) => void;
  toggleForm: (add: boolean) => void;
  setPageNumber: (page: number) => void;
};
export const useUserUIStore = create<UserUIState>((set) => ({
  selectedUser: null,
  toggle: false,
  pageNumber: 0,
  selectUser: (user) => set({ selectedUser: user }),
  toggleForm: (add) => set({ toggle: add }),
  setPageNumber: (page) => set({ pageNumber: page }),
}));
