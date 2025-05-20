import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowRight, ChevronLeft, Loader } from "lucide-react";

type PreferenceState = {
  disease: string[];
  diet: string[];
};

interface TwoProps {
  preference: PreferenceState;
  setPreference: Dispatch<SetStateAction<PreferenceState>>;
  setStep: Dispatch<SetStateAction<number>>;
  submitFn: () => void;
  isLoading?: boolean;
}

const diseaseOptions = [
  "Hypertension",
  "Low Diabetes",
  "Gout",
  "Artheroslerosis",
];

const dietOptions = ["Vegetarian", "Low Carb", "High Protein", "Gluten Free"];

const toggleItem = (current: string[], item: string): string[] =>
  current.includes(item)
    ? current.filter((i) => i !== item)
    : [...current, item];

const Two = ({
  preference,
  setPreference,
  setStep,
  submitFn,
  isLoading,
}: TwoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 2: Meal Plan Preferences</CardTitle>
        <CardDescription>Customize your meal plan settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Disease Conditions */}
          <div className="grid gap-2 space-y-3">
            <Label>Disease Conditions</Label>
            <div className="grid grid-cols-2 gap-4">
              {diseaseOptions.map((item) => {
                const id = item.toLowerCase().replace(/\s+/g, "-");
                return (
                  <div key={id} className="flex items-center space-x-2">
                    <Checkbox
                      id={id}
                      checked={preference.disease.includes(item)}
                      onCheckedChange={() =>
                        setPreference((prev) => ({
                          ...prev,
                          disease: toggleItem(prev.disease, item),
                        }))
                      }
                    />
                    <Label htmlFor={id}>{item}</Label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Diet Preferences */}
          <div className="grid gap-2">
            <Label>Dietary Preferences</Label>
            <div className="grid grid-cols-2 gap-4">
              {dietOptions.map((item) => {
                const id = item.toLowerCase().replace(/\s+/g, "-");
                return (
                  <div key={id} className="flex items-center space-x-2">
                    <Checkbox
                      id={id}
                      checked={preference.diet.includes(item)}
                      onCheckedChange={() =>
                        setPreference((prev) => ({
                          ...prev,
                          diet: toggleItem(prev.diet, item),
                        }))
                      }
                    />
                    <Label htmlFor={id}>{item}</Label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              disabled={isLoading}
              variant="outline"
              onClick={() => setStep(1)}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700"
              onClick={submitFn}
            >
              {isLoading ? "Generating" : "Generate Meal Plan"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Two;
