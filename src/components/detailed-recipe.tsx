import { Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface RecipeProps {
  title: string;
  prepTime: number;
  ingredients: string[];
  instructions: string[];
  nutritionInfo?: NutritionInfo;
}

export default function DetailedRecipe({
  title,
  prepTime,
  ingredients,
  instructions,
  nutritionInfo,
}: RecipeProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Featured Recipe</CardTitle>
        <CardDescription>
          Detailed recipe for one of your meal plan items.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <Clock className="h-4 w-4 mr-1" />
              <span>{prepTime} mins preparation time</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2">Ingredients</h4>
            <ul className="list-disc pl-5 space-y-1">
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2">Instructions</h4>
            <ol className="list-decimal pl-5 space-y-2">
              {instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>

          {nutritionInfo && (
            <div>
              <h4 className="font-bold mb-2">Nutritional Information</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Calories</p>
                  <p className="font-bold">{nutritionInfo.calories} kcal</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Protein</p>
                  <p className="font-bold">{nutritionInfo.protein}g</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Carbs</p>
                  <p className="font-bold">{nutritionInfo.carbs}g</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Fat</p>
                  <p className="font-bold">{nutritionInfo.fat}g</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
