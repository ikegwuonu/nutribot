"use server";
export async function createMealPlan(instruction: string) {
  const res = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "meta-llama-llama-2-70b-hf", // or whichever one you're using
      messages: [
        {
          role: "system",
          content: "You're a helpful dietitian AI...",
        },
        {
          role: "user",
          content: instruction,
        },
      ],
    }),
  });

  const data = await res.json();

  const message = data?.choices?.[0]?.message?.content;
  console.log("Meal Plan Output:", message);

  return message || "No meal plan generated.";
}
