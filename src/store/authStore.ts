import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserProfile = {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'user';
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: UserProfile | null;
  login: (token: string, user: UserProfile) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,

      login: (token: string, user: UserProfile) => {
        set({
          isAuthenticated: true,
          token: token,
          user: user,
        });
      },

      logout: () => {
        set({
          isAuthenticated: false,
          token: null,
          user: null,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);