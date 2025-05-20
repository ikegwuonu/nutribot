"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createMealPlan(instruction: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gemini`, {
    method: "POST",
    body: JSON.stringify({
      instruction,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("Gemini response:", res);
  return res;
  //revalidatePath("/");

  // Redirect or show confirmation
  //redirect(`/result?mealPlan=${encodeURIComponent(mealPlan)}`);
}
