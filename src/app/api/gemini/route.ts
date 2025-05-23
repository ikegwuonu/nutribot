// app/api/your-endpoint/route.ts

import { NextResponse } from "next/server";
import { RateLimiterRedis } from "rate-limiter-flexible";
import Redis from "ioredis";
import { handleApiError } from "@/lib/utils";

const redisClient = new Redis({
  host: process.env.UPSTASH_REDIS_REST_URL?.replace("https://", "").replace(
    /\/$/,
    ""
  ),
  password: process.env.UPSTASH_REDIS_REST_TOKEN,
  tls: { rejectUnauthorized: false },
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimit",
  points: 2, // Allow only 2 requests
  duration: 60 * 60 * 24 * 365 * 10, // 10 years = simulate "ever"
});

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown";

  try {
    // Check status without consuming
    const rateInfo = await rateLimiter.get(ip);
    console.log("Current rate limit status for IP:", rateInfo);
    await rateLimiter.consume(ip);

    const { instruction } = await req.json();

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
                  text: `Create a detailed 7-day Nigerian meal plan based on these food items: ${instruction}.
    Return the result as a JSON array of 7 objects where each object has:
    - "day": number (from 1 to 7)
    - "meals": an array of 3 objects with:
      - "title": string
      - "prepTime": number (in minutes)
      - "type": "breakfast" | "lunch" | "dinner"
      - "ingredients": string[]
      - "instructions": string[]
      - "nutritionInfo": { "calories": number, "protein": number, "carbs": number, "fat": number }

    Only return valid raw JSON. Return valid JSON. Do not include any markdown, explanation, or formatting. Make detailedInstructions detailed, stepwise and easy for amateur cooks.`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json(
      data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response"
    );
  } catch (err) {
    handleApiError(err);
    return new NextResponse(
      JSON.stringify({
        error:
          "Rate limit exceeded. You have already used your 2 free requests.",
      }),
      {
        status: 429,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
