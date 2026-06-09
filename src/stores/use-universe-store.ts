import { create } from "zustand";

type UniverseState = {
  selectedNode: string | null;
  zoomLevel: number;
  graphFilters: string[];
  layoutMode: "force" | "radial";
  setSelectedNode: (selectedNode: string | null) => void;
  setZoomLevel: (zoomLevel: number) => void;
  setGraphFilters: (graphFilters: string[]) => void;
  setLayoutMode: (layoutMode: "force" | "radial") => void;
};

export const useUniverseStore = create<UniverseState>((set) => ({
  selectedNode: null,
  zoomLevel: 1,
  graphFilters: [],
  layoutMode: "force",
  setSelectedNode: (selectedNode) => set({ selectedNode }),
  setZoomLevel: (zoomLevel) => set({ zoomLevel }),
  setGraphFilters: (graphFilters) => set({ graphFilters }),
  setLayoutMode: (layoutMode) => set({ layoutMode })
}));
