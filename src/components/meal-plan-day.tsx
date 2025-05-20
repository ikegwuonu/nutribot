"use client";
import RecipeCard from "@/components/recipe-card";

interface Meal {
  title: string;
  prepTime: number;
  type: "breakfast" | "lunch" | "dinner" | "snack";
}

interface MealPlanDayProps {
  day: number;
  meals: Meal[];
  onRecipeClick?: (meal: Meal) => void;
}

export default function MealPlanDay({
  day,
  meals,
  onRecipeClick,
}: MealPlanDayProps) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-bold text-lg mb-4">Day {day}</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {meals.map((meal, index) => (
            <RecipeCard
              key={index}
              title={meal.title}
              prepTime={meal.prepTime}
              mealType={meal.type}
              onClick={() => onRecipeClick && onRecipeClick(meal)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
