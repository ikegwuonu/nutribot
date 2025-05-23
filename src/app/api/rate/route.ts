// app/api/rate-limit-status/route.ts

import { NextResponse } from "next/server";
import { RateLimiterRedis } from "rate-limiter-flexible";
import Redis from "ioredis";

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
  points: 2,
  duration: 60 * 60 * 24 * 365 * 10, // 10 years
});

export async function GET(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown";

  const rateInfo = await rateLimiter.get(ip);

  if (!rateInfo) {
    return NextResponse.json({
      ip,
      remainingPoints: 2,
      status: "This IP has not used any points yet.",
    });
  }

  return NextResponse.json({
    ip,
    remainingPoints: rateInfo.remainingPoints,
    consumedPoints: rateInfo.consumedPoints,
    msBeforeNext: rateInfo.msBeforeNext,
    status:
      rateInfo.remainingPoints > 0
        ? "You still have available requests."
        : "You have reached the limit.",
  });
}
