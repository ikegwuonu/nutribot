"use server";

export async function createMealPlan(instruction: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gemini`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ instruction }),
  });

  const data = await res.json();
  console.log("Response from API:", data);

  return data; // or whatever you need to return
}
