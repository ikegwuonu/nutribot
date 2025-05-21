export async function POST(req: Request) {
  const { instructions } = await req.json();

  const response = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat", // or "deepseek-coder", depending on the variant
      messages: [
        {
          role: "user",
          content: `Create a detailed 7-day Nigerian meal plan based on these instructions: ${instructions}.
          Return the result as a JSON array of 7 objects where each object has:
          - "day": number (from 1 to 7)
          - "meals": an array of 3 objects with:
            - "title": string
            - "prepTime": number (in minutes)
            - "type": "breakfast" | "lunch" | "dinner"
            - "ingredients": string[]
            - "instructions": string[]
            - "nutritionInfo": { "calories": number, "protein": number, "carbs": number, "fat": number }
          
          Only return valid raw JSON. Return valid JSON. Do not include any markdown, explanation, or formatting.
`,
        },
      ],
      temperature: 0.7,
      top_p: 0.95,
    }),
  });

  const data = await response.json();
  const jsonOutput = data.choices?.[0]?.message?.content || "";
  return jsonOutput;
}
