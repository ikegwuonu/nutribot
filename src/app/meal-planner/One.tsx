import FoodCard from "@/components/food-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Apple, ArrowRight, Carrot, Utensils } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

const foodItems = [
  "Rice",
  "Yam",
  "Beans",
  "Plantain",
  "Garri",
  "Semovita",
  "Amala",
  "Pounded Yam",
  "Eba",
  "Fufu",
  "Jollof Rice",
  "Fried Rice",
];

const fruits = [
  "Mango",
  "Banana",
  "Orange",
  "Pineapple",
  "Watermelon",
  "Pawpaw",
  "Guava",
  "Soursop",
  "Coconut",
  "Avocado",
  "Grape",
  "Pear",
];

const vegetables = [
  "Spinach",
  "Efo",
  "Ugu",
  "Water Leaf",
  "Bitter Leaf",
  "Okra",
  "Tomatoes",
  "Peppers",
  "Onions",
  "Garden Egg",
];
interface OneProps {
  selectedFoods: Record<string, boolean>;
  setSelectedFoods: Dispatch<SetStateAction<Record<string, boolean>>>;
  setStep: Dispatch<SetStateAction<number>>;
}
const One = ({ selectedFoods, setSelectedFoods, setStep }: OneProps) => {
  console.log("Selected Foods:", selectedFoods);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 1: Select Your Food Preferences</CardTitle>
        <CardDescription>
          Choose the Nigerian foods, fruits, and vegetables you enjoy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="food-items">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="food-items" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              Food Items
            </TabsTrigger>
            <TabsTrigger value="fruits" className="flex items-center gap-2">
              <Apple className="h-4 w-4" />
              Fruits
            </TabsTrigger>
            <TabsTrigger value="vegetables" className="flex items-center gap-2">
              <Carrot className="h-4 w-4" />
              Vegetables
            </TabsTrigger>
          </TabsList>

          <TabsContent value="food-items" className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {foodItems.map((item) => {
                const id = item.toLowerCase().replace(/\s+/g, "-");
                return (
                  <FoodCard
                    key={item}
                    id={id}
                    name={item}
                    type="food"
                    checked={!!selectedFoods[`food-${id}`]}
                    onCheckedChange={(checked) => {
                      setSelectedFoods((prev) => ({
                        ...prev,
                        [`food-${id}`]: checked,
                      }));
                    }}
                  />
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="fruits" className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {fruits.map((item) => {
                const id = item.toLowerCase().replace(/\s+/g, "-");
                return (
                  <FoodCard
                    key={item}
                    id={id}
                    name={item}
                    type="fruit"
                    checked={!!selectedFoods[`fruit-${id}`]}
                    onCheckedChange={(checked) => {
                      setSelectedFoods((prev) => ({
                        ...prev,
                        [`fruit-${id}`]: checked,
                      }));
                    }}
                  />
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="vegetables" className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {vegetables.map((item) => {
                const id = item.toLowerCase().replace(/\s+/g, "-");
                return (
                  <FoodCard
                    key={item}
                    id={id}
                    name={item}
                    type="vegetable"
                    checked={!!selectedFoods[`vegetable-${id}`]}
                    onCheckedChange={(checked) => {
                      setSelectedFoods((prev) => ({
                        ...prev,
                        [`vegetable-${id}`]: checked,
                      }));
                    }}
                  />
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          {/* For debugging - you can remove this in production */}
          <div className="mb-4 text-sm text-muted-foreground">
            Selected items:{" "}
            {
              Object.entries(selectedFoods).filter(([_, selected]) => selected)
                .length
            }
          </div>
          <Button
            className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
            onClick={() => setStep(2)}
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default One;
