export interface SquareMeal {
  title: string;
  prepTime: number;
  type: "lunch" | "brakfast" | "dinner";
  ingredients: string[];
  instructions: string[];
  nutritionInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}
export interface Plan {
  day: number;
  meals: SquareMeal[];
}
export interface IPlanStore {
  hasPlan: boolean;
  mealPlan: Plan[];
  setMealPlan: (newPlan: Plan[]) => void;
  clearMealPlan: () => void;
}
