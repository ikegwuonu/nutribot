"use client";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import One from "./One";
import Two from "./Two";
import { handleApiError } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Plan } from "@/lib/types";
import { usePlanStore } from "@/zustand/planStore";
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
  const { setMealPlan } = usePlanStore();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
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

    const instruction = `${
      selectedFoods.fruits.length > 0 &&
      "fruits:" + selectedFoods.fruits.join(",") + ","
    } ${
      selectedFoods.foods.length > 0 &&
      " foods:" + selectedFoods.foods.join(",") + ","
    } ${
      selectedFoods.vegetables.length > 0 &&
      " vegetables:" + selectedFoods.vegetables.join(",") + ","
    } ${
      preference.disease.length > 0 &&
      " for a patient with" + preference.disease.join(",") + ","
    } having a ${preference.diet.join(
      ","
    )} diet. Meals must follow a healthy ${dietArray.join(",")} diet`;

    setLoading(true);
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ instruction }),
      });

      const data = await res.json();

      const cleanJson = data
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      const mealPlan: Plan[] = JSON.parse(cleanJson);

      setMealPlan(mealPlan);
      router.push("/plan");
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
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
              isLoading={loading}
            />
          )}
        </div>
      </main>
    </div>
  );
}
