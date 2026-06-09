import { create } from "zustand";

type WatchPartyState = {
  roomPanelOpen: boolean;
  activeTab: "details" | "guests" | "chat";
  optimisticGuests: string[];
  setRoomPanelOpen: (roomPanelOpen: boolean) => void;
  setActiveTab: (activeTab: "details" | "guests" | "chat") => void;
  addOptimisticGuest: (guest: string) => void;
};

export const useWatchPartyStore = create<WatchPartyState>((set) => ({
  roomPanelOpen: true,
  activeTab: "details",
  optimisticGuests: [],
  setRoomPanelOpen: (roomPanelOpen) => set({ roomPanelOpen }),
  setActiveTab: (activeTab) => set({ activeTab }),
  addOptimisticGuest: (guest) => set((state) => ({ optimisticGuests: [...state.optimisticGuests, guest] }))
}));
