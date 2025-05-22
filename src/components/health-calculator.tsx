"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, Activity } from "lucide-react";
import { calculateBMI, calculateCalories } from "@/lib/utils";

export default function HealthCalculator() {
  // BMI Calculator State
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmiResult, setBmiResult] = useState<{
    bmi: number;
    category: string;
  } | null>(null);

  // Calorie Calculator State
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [calorieResult, setCalorieResult] = useState<number | null>(null);
  const calculateBMIs = () => {
    const { bmi, category } = calculateBMI({ height, weight });
    setBmiResult({ bmi, category });
  };

  // Calculate Calorie Needs
  const calculateCalorie = () => {
    const calories = calculateCalories({
      age,
      activityLevel,
      gender,
      height,
      weight,
    });
    setCalorieResult(calories);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl" id="calculator">
          Health Calculator
        </CardTitle>
        <CardDescription>
          Calculate your BMI and daily calorie needs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bmi" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bmi" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              BMI Calculator
            </TabsTrigger>
            <TabsTrigger value="calories" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Calorie Calculator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bmi" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="e.g. 170"
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value);
                    setBmiResult(null);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g. 70"
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                    setBmiResult(null);
                  }}
                />
              </div>
            </div>

            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={calculateBMIs}
              disabled={!height || !weight}
            >
              Calculate BMI
            </Button>

            {bmiResult && (
              <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-100">
                <h3 className="font-bold text-lg mb-2">Your BMI Result</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">BMI Value</p>
                    <p className="text-2xl font-bold text-green-700">
                      {bmiResult.bmi}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="text-lg font-semibold">
                      {bmiResult.category}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  BMI is a screening tool, not a diagnostic of body fatness or
                  health.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="calories" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="e.g. 30"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                    setCalorieResult(null);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup
                  value={gender}
                  onValueChange={(value: string) => {
                    setGender(value);
                    setCalorieResult(null);
                  }}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height-cal">Height (cm)</Label>
                <Input
                  id="height-cal"
                  type="number"
                  placeholder="e.g. 170"
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value);
                    setCalorieResult(null);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight-cal">Weight (kg)</Label>
                <Input
                  id="weight-cal"
                  type="number"
                  placeholder="e.g. 70"
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                    setCalorieResult(null);
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="activity">Activity Level</Label>
              <Select
                value={activityLevel}
                onValueChange={(value: string) => {
                  setActivityLevel(value);
                  setCalorieResult(null);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">
                    Sedentary (little or no exercise)
                  </SelectItem>
                  <SelectItem value="light">
                    Lightly active (light exercise 1-3 days/week)
                  </SelectItem>
                  <SelectItem value="moderate">
                    Moderately active (moderate exercise 3-5 days/week)
                  </SelectItem>
                  <SelectItem value="active">
                    Very active (hard exercise 6-7 days/week)
                  </SelectItem>
                  <SelectItem value="veryActive">
                    Extra active (very hard exercise & physical job)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={calculateCalorie}
              disabled={!age || !height || !weight}
            >
              Calculate Calories
            </Button>

            {calorieResult && (
              <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-100">
                <h3 className="font-bold text-lg mb-2">
                  Your Daily Calorie Needs
                </h3>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Estimated Daily Calories
                  </p>
                  <p className="text-3xl font-bold text-green-700">
                    {calorieResult} kcal
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-green-100 rounded">
                    <p className="text-sm font-medium">Weight Loss</p>
                    <p className="font-bold">{calorieResult - 500} kcal</p>
                  </div>
                  <div className="p-2 bg-green-200 rounded">
                    <p className="text-sm font-medium">Maintenance</p>
                    <p className="font-bold">{calorieResult} kcal</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded">
                    <p className="text-sm font-medium">Weight Gain</p>
                    <p className="font-bold">{calorieResult + 500} kcal</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  These are estimates based on the Mifflin-St Jeor equation.
                  Individual needs may vary.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
