import DetailedRecipe from "@/components/detailed-recipe";
import React, { Dispatch, SetStateAction } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import MealPlanDay from "@/components/meal-plan-day";

const mealPlanData = [
  {
    day: 1,
    meals: [
      { title: "Yam and Egg Sauce", prepTime: 30, type: "breakfast" },
      { title: "Jollof Rice with Chicken", prepTime: 45, type: "lunch" },
      { title: "Eba with Efo Riro", prepTime: 40, type: "dinner" },
    ],
  },
  {
    day: 2,
    meals: [
      { title: "Akara and Pap", prepTime: 35, type: "breakfast" },
      { title: "Beans and Plantain", prepTime: 40, type: "lunch" },
      { title: "Amala with Ewedu Soup", prepTime: 50, type: "dinner" },
    ],
  },
  // More days would be added here
];

const jollofRiceRecipe = {
  title: "Jollof Rice with Chicken",
  prepTime: 45,
  ingredients: [
    "2 cups long grain rice",
    "4 large tomatoes",
    "2 red bell peppers",
    "2 medium onions",
    "3 tablespoons tomato paste",
    "1/4 cup vegetable oil",
    "2 cloves garlic",
    "1 teaspoon thyme",
    "2 bay leaves",
    "1 teaspoon curry powder",
    "2 chicken stock cubes",
    "Salt to taste",
    "4 chicken pieces (thighs or drumsticks)",
  ],
  instructions: [
    "Blend tomatoes, red bell peppers, and one onion until smooth.",
    "Season chicken with salt, curry, and one stock cube. Cook until tender, about 20 minutes.",
    "Heat vegetable oil in a large pot and sauté the remaining chopped onion until translucent.",
    "Add tomato paste and fry for 2-3 minutes.",
    "Pour in the blended tomato mixture and cook on medium heat for 10-15 minutes.",
    "Add thyme, curry powder, bay leaves, and the remaining stock cube.",
    "Wash rice thoroughly and add to the pot. Add chicken stock to just cover the rice.",
    "Cover pot with foil and then the lid to trap steam. Cook on low heat for 30 minutes.",
    "Stir occasionally to prevent burning and add more stock if needed.",
    "Serve hot with the cooked chicken pieces.",
  ],
  nutritionInfo: {
    calories: 450,
    protein: 22,
    carbs: 65,
    fat: 12,
  },
};
interface ThreeProps {
  setStep: Dispatch<SetStateAction<number>>;
}
const Three = ({ setStep }: ThreeProps) => {
  return (
    <div className="space-y-8 container py-12">
      <main className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Your Nigerian Meal Plan</CardTitle>
            <CardDescription>
              Here's your personalized 7-day Nigerian meal plan based on your
              preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mealPlanData.map((dayPlan) => (
                <MealPlanDay
                  key={dayPlan.day}
                  day={dayPlan.day}
                  meals={dayPlan.meals}
                />
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button variant="outline" onClick={() => setStep(2)}>
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
          title={jollofRiceRecipe.title}
          prepTime={jollofRiceRecipe.prepTime}
          ingredients={jollofRiceRecipe.ingredients}
          instructions={jollofRiceRecipe.instructions}
          nutritionInfo={jollofRiceRecipe.nutritionInfo}
        />
      </main>
    </div>
  );
};

export default Three;
