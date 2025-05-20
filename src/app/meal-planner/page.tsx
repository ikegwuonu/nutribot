"use client";
import { useState, useTransition } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import One from "./One";
import Three from "./Three";
import Two from "./Two";
import { createMealPlan } from "@/lib/actions";
import { handleApiError } from "@/lib/utils";
import { useRouter } from "next/navigation";
interface SelectionState {
  foods: string[];
  fruits: string[];
  vegetables: string[];
}
type PreferenceState = {
  disease: string[];
  diet: string[];
};
const diets = {
  Hypertension: "DASH ",
  Diabetes: "DASH",
  Gout: "low Purine",
  Artheroslerosis: "low Cholesterol",
};
export default function MealPlanner() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [preference, setPreference] = useState<PreferenceState>({
    diet: [],
    disease: [],
  });
  const [selectedFoods, setSelectedFoods] = useState<SelectionState>({
    foods: [],
    fruits: [],
    vegetables: [],
  });
  const onSubmit = async () => {
    const dietArray = preference.disease.map(
      (disease) => diets[disease as keyof typeof diets]
    );

    const instructions = `fruits:${selectedFoods.fruits.join(
      ","
    )}, foods:${selectedFoods.foods.join(
      ","
    )}, vegetables:${selectedFoods.vegetables.join(
      ","
    )} for a patient with ${preference.disease.join(
      ","
    )} having a ${preference.diet.join(
      ","
    )} diet. Meals should follow ${dietArray.join(",")} diet`;

    startTransition(async () => {
      try {
        const response = await createMealPlan(instructions); // calls server action
        if (!response.ok) {
          throw new Error("Failed to generate meal plan");
        }

        const data = await response.json();
        const mealPlan = data.mealPlan;
        // router.push(`/result?mealPlan=${encodeURIComponent(mealPlan)}`);
      } catch (error) {
        handleApiError(error);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Navbar showFullNav={false} />

      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="text-sm flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Create Your Nigerian Meal Plan
            </h1>
            <p className="text-muted-foreground">
              Select your preferred foods to generate a customized meal plan.
            </p>
          </div>

          {step === 1 && (
            <One
              selectedFoods={selectedFoods}
              setSelectedFoods={setSelectedFoods}
              setStep={setStep}
            />
          )}

          {step === 2 && (
            <Two
              submitFn={onSubmit}
              preference={preference}
              setPreference={setPreference}
              setStep={setStep}
              isLoading={isPending}
            />
          )}

          {step === 3 && <Three setStep={setStep} />}
        </div>
      </main>
    </div>
  );
}
