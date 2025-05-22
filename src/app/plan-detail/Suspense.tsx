"use client";
import DetailedRecipe from "@/components/detailed-recipe";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { usePlanStore } from "@/zustand/planStore";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const Suspenses = () => {
  const day = useSearchParams().get("day");
  //const type = useSearchParams().get("type");
  const { mealPlan } = usePlanStore();
  const dayPlan = mealPlan.filter((plan) => plan.day === Number(day))[0];
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      }
    >
      <div className="space-y-8 mx-auto max-w-4xl z-10 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Day {day}</CardTitle>
          </CardHeader>
        </Card>
        {dayPlan?.meals.length > 0 &&
          dayPlan.meals.map((meal, i) => (
            <DetailedRecipe
              detail={true}
              type={meal.type}
              key={meal.title + i}
              title={meal.title}
              prepTime={meal.prepTime}
              ingredients={meal.ingredients}
              instructions={meal.instructions}
              nutritionInfo={meal.nutritionInfo}
            />
          ))}
      </div>
    </Suspense>
  );
};

export default Suspenses;
