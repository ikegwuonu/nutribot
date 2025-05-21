import { IPlanStore, Plan } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState: Plan[] = [
  {
    day: 0,
    meals: [
      {
        title: "",
        prepTime: 0,
        ingredients: [],
        instructions: [],
        nutritionInfo: {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
        },
        type: "lunch",
      },
    ],
  },
];
export const usePlanStore = create(
  persist<IPlanStore>(
    (set) => ({
      hasPlan: false,
      mealPlan: initialState,
      setMealPlan: (newPlan: Plan[]) =>
        set((state: IPlanStore) => ({
          mealPlan: newPlan ?? state.mealPlan,
          hasPlan: true,
        })),
      clearMealPlan: () =>
        set({
          mealPlan: initialState,
          hasPlan: false,
        }),
    }),
    { name: "plan-storage" }
  )
);
