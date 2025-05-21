"use client";
import DetailedRecipe from "@/components/detailed-recipe";
import { usePlanStore } from "@/zustand/planStore";
import { useSearchParams } from "next/navigation";
import React from "react";

const page = () => {
  const day = useSearchParams().get("day");
  const type = useSearchParams().get("type");
  const { mealPlan } = usePlanStore();
  const dayPlan = mealPlan.filter((plan) => plan.day === Number(day))[0];
  return (
    <div>
      {dayPlan.meals.map((meal, i) => (
        <DetailedRecipe
          key={meal.title + i}
          title={meal.title}
          prepTime={meal.prepTime}
          ingredients={meal.ingredients}
          instructions={meal.instructions}
          nutritionInfo={meal.nutritionInfo}
        />
      ))}
    </div>
  );
};

export default page;
