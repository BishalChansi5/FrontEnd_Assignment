import { create } from "zustand";
import type { User } from "../users/type/user";

type UserUIState = {
  selectedUser: User | null;
  toggle: boolean;
  selectUser: (user: User | null) => void;
  toggleForm: (add: boolean) => void;
};
export const useUserUIStore = create<UserUIState>((set) => ({
  selectedUser: null,
  toggle: false,
  selectUser: (user) => set({ selectedUser: user }),
  toggleForm: (add) => set({ toggle: add }),
}));
