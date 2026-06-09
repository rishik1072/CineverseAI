import { create } from "zustand";

type BattleState = {
  movieA: number | undefined;
  movieB: number | undefined;
  comparisonMode: "balanced" | "awards" | "box-office";
  setMovieA: (movieA?: number) => void;
  setMovieB: (movieB?: number) => void;
  setComparisonMode: (comparisonMode: BattleState["comparisonMode"]) => void;
};

export const useBattleStore = create<BattleState>((set) => ({
  movieA: undefined,
  movieB: undefined,
  comparisonMode: "balanced",
  setMovieA: (movieA) => set({ movieA }),
  setMovieB: (movieB) => set({ movieB }),
  setComparisonMode: (comparisonMode) => set({ comparisonMode })
}));
