"use client";
import DetailedRecipe from "@/components/detailed-recipe";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import MealPlanDay from "@/components/meal-plan-day";
import { usePlanStore } from "@/zustand/planStore";
import Link from "next/link";

const Page = () => {
  const { mealPlan, hasPlan } = usePlanStore();
  console.log("mealPlan", mealPlan);
  console.log("hasPlan", hasPlan);
  return (
    <div className="space-y-8 mx-auto max-w-4xl z-10">
      {" "}
      {hasPlan ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Your Nigerian Meal Plan</CardTitle>
              <CardDescription>
                Here&apos;s your personalized 7-day Nigerian meal plan based on
                your preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mealPlan.map((dayPlan, i) => (
                  <MealPlanDay
                    key={dayPlan.day + i}
                    day={dayPlan.day}
                    meals={dayPlan.meals}
                  />
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button variant="outline">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Preferences
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  View Detailed Recipes
                </Button>
              </div>
            </CardContent>
          </Card>

          <DetailedRecipe
            type={mealPlan[0].meals[0].type}
            title={mealPlan[0].meals[0].title}
            prepTime={mealPlan[0].meals[0].prepTime}
            ingredients={mealPlan[0].meals[0].ingredients}
            instructions={mealPlan[0].meals[0].instructions}
            nutritionInfo={mealPlan[0].meals[0].nutritionInfo}
          />
        </>
      ) : (
        <Card className="">
          <CardHeader>
            <CardTitle className="text-center">Sorry!</CardTitle>
            <CardDescription className="text-center">
              No Plan Available
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button className="space-y-6" asChild>
              <Link href={"/meal-planner"}>Go back</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Page;
