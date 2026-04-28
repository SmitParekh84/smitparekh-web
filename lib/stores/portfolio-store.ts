import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

type PortfolioState = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  resetCategory: () => void;
};

const DEFAULT_CATEGORY = "All";

export const usePortfolioStore = create<PortfolioState>()((set) => ({
  selectedCategory: DEFAULT_CATEGORY,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  resetCategory: () => set({ selectedCategory: DEFAULT_CATEGORY }),
}));

export const usePortfolioFilter = () =>
  usePortfolioStore(
    useShallow((s) => ({
      selectedCategory: s.selectedCategory,
      setSelectedCategory: s.setSelectedCategory,
    })),
  );

