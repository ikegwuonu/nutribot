export async function POST(req: Request) {
  const { instructions } = await req.json();

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
      process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Create a detailed 7-day Nigerian meal plan based on these instructions: ${instructions}.
        Return the result as a JSON array of 7 objects where each object has:
        - "day": number (from 1 to 7)
        - "meals": an array of 3 objects with:
          - "title": string
          - "prepTime": number (in minutes)
          - "type": "breakfast" | "lunch" | "dinner"
          - "ingredients": string[]
          - "instructions": string[]
          - "nutritionInfo": { "calories": number, "protein": number, "carbs": number, "fat": number }
        
        Only return valid raw JSON.`,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  console.log("Gemini response:", data);
  return Response.json({
    mealPlan: data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response",
  });
}
