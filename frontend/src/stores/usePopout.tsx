import { create } from 'zustand';
import { ReactElement } from 'react';

type PopoutState = {
  current: ReactElement | null;
  set: (current: ReactElement | null) => void;
};

export const usePopout = create<PopoutState>((set) => ({
  current: null,
  set: (current) => set({ current }),
}));
