import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { showerror } from "./toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleApiError = (error: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const err = error?.response?.data?.errors as any[];

  if (!navigator.onLine) {
    return showerror("No internet connection.");
  }
  if (error?.code === "ERR_NETWORK") {
    return showerror("Network error occurred.");
  }

  if (error?.message) {
    return showerror(error.message);
  }
  if (typeof error == "string") {
    return showerror(error);
  }

  if (error?.data?.message) {
    return showerror(error?.data?.message);
  }
  if (error?.request) {
    return showerror(error?.statusText);
  } else {
    return showerror("An error occurred");
  }
};
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};
export const convertSecToMin = (val: number) => {
  const min = Math.floor(val / 60);

  const sec = (val % 60).toString().padStart(2, "0");
  return min + ":" + sec;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getInitials = (firstName: string, lastName: string): string => {
  return (firstName[0] + lastName[0]).toUpperCase();
};

// Calculate BMI
export const calculateBMI = ({
  height,
  weight,
}: {
  height: string;
  weight: string;
}): { category: string; bmi: number } => {
  //if (!height || !weight) return;

  const heightInMeters = Number.parseFloat(height) / 100;
  const weightInKg = Number.parseFloat(weight);

  if (
    isNaN(heightInMeters) ||
    isNaN(weightInKg) ||
    heightInMeters <= 0 ||
    weightInKg <= 0
  ) {
    // return;
  }

  const bmi = weightInKg / (heightInMeters * heightInMeters);
  let category = "";

  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    category = "Normal weight";
  } else if (bmi >= 25 && bmi < 30) {
    category = "Overweight";
  } else {
    category = "Obesity";
  }
  return { category, bmi: Number.parseFloat(bmi.toFixed(1)) };
};
// Calculate Calorie Needs
export const calculateCalories = ({
  age,
  gender,
  activityLevel,
  weight,
  height,
}: {
  age: string;
  gender: string;
  activityLevel: string;
  weight: string;
  height: string;
}): number | null => {
  if (!age || !gender || !activityLevel) return null;

  const ageValue = Number.parseFloat(age);

  if (isNaN(ageValue) || ageValue <= 0) {
    return null;
  }

  // Base Metabolic Rate (BMR) using Mifflin-St Jeor Equation
  let bmr = 0;
  if (gender === "male") {
    bmr =
      10 * Number.parseFloat(weight) +
      6.25 * Number.parseFloat(height) -
      5 * ageValue +
      5;
  } else {
    bmr =
      10 * Number.parseFloat(weight) +
      6.25 * Number.parseFloat(height) -
      5 * ageValue -
      161;
  }

  // Activity multipliers
  const activityMultipliers = {
    sedentary: 1.2, // Little or no exercise
    light: 1.375, // Light exercise 1-3 days/week
    moderate: 1.55, // Moderate exercise 3-5 days/week
    active: 1.725, // Hard exercise 6-7 days/week
    veryActive: 1.9, // Very hard exercise & physical job or 2x training
  };

  const calories = Math.round(
    bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers]
  );
  return calories;
};
