"use client";

import { Checkbox } from "@/components/ui/checkbox";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ChevronLeft, Apple, Carrot, Utensils } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import One from "./One";
import Three from "./Three";

export default function MealPlanner() {
  const [step, setStep] = useState(1);
  const [selectedFoods, setSelectedFoods] = useState<Record<string, boolean>>(
    {}
  );

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
            <Card>
              <CardHeader>
                <CardTitle>Step 2: Meal Plan Preferences</CardTitle>
                <CardDescription>
                  Customize your meal plan settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="days">Number of Days</Label>
                    <Input
                      id="days"
                      type="number"
                      defaultValue="7"
                      min="1"
                      max="14"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="meals-per-day">Meals Per Day</Label>
                    <Input
                      id="meals-per-day"
                      type="number"
                      defaultValue="3"
                      min="1"
                      max="6"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Dietary Preferences</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="vegetarian" />
                        <Label htmlFor="vegetarian">Vegetarian</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="low-carb" />
                        <Label htmlFor="low-carb">Low Carb</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="high-protein" />
                        <Label htmlFor="high-protein">High Protein</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="gluten-free" />
                        <Label htmlFor="gluten-free">Gluten Free</Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => setStep(3)}
                    >
                      Generate Meal Plan
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && <Three setStep={setStep} />}
        </div>
      </main>
    </div>
  );
}
