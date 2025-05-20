"use client";

import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecipeCardProps {
  title: string;
  prepTime: number;
  mealType?: "breakfast" | "lunch" | "dinner" | "snack";
  onClick?: () => void;
}

export default function RecipeCard({
  title,
  prepTime,
  mealType,
  onClick,
}: RecipeCardProps) {
  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-base">
          {mealType
            ? mealType.charAt(0).toUpperCase() + mealType.slice(1)
            : "Recipe"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-medium">{title}</p>
        <div className="flex items-center text-sm text-muted-foreground mt-2">
          <Clock className="h-4 w-4 mr-1" />
          <span>{prepTime} mins</span>
        </div>
      </CardContent>
    </Card>
  );
}
