import { User } from "@prisma/client";
import { create } from "zustand";

const initialState = {
  bears: 0,
};

interface IAuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const authStore = create<IAuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

export default authStore;
