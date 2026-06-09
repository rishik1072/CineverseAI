import { create } from "zustand";

type UIState = {
  sidebarOpen: boolean;
  commandOpen: boolean;
  startupAnimationComplete: boolean;
  reducedMotion: boolean;
  activeModal: string | null;
  setSidebarOpen: (value: boolean) => void;
  setCommandOpen: (value: boolean) => void;
  setStartupAnimationComplete: (value: boolean) => void;
  setReducedMotion: (value: boolean) => void;
  setActiveModal: (value: string | null) => void;
};

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  commandOpen: false,
  startupAnimationComplete: false,
  reducedMotion: false,
  activeModal: null,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setCommandOpen: (commandOpen) => set({ commandOpen }),
  setStartupAnimationComplete: (startupAnimationComplete) => set({ startupAnimationComplete }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setActiveModal: (activeModal) => set({ activeModal })
}));
