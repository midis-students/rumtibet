import { create, useStore } from 'zustand';
import { persist } from 'zustand/middleware';

type SessionStore = {
  user: any;
  access_token: string | null;

  setAccessToken: (value: string) => void;
  setUser: (user: any) => void;
};

export const sessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      user: null,
      access_token: null,
      setAccessToken: (access_token) => set({ access_token }),
      setUser: (user) => set({ user }),
    }),
    { name: 'session-store' }
  )
);

export const useAuth = () =>
  useStore(sessionStore, (select) => !!select.access_token);
