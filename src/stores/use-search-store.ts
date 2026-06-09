import { create } from "zustand";

type SearchState = {
  viewMode: "grid" | "list";
  recentLocalQueries: string[];
  setViewMode: (viewMode: "grid" | "list") => void;
  addRecentQuery: (query: string) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  viewMode: "grid",
  recentLocalQueries: [],
  setViewMode: (viewMode) => set({ viewMode }),
  addRecentQuery: (query) =>
    set((state) => ({
      recentLocalQueries: [query, ...state.recentLocalQueries.filter((item) => item !== query)].slice(0, 8)
    }))
}));
