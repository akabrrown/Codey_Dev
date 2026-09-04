import arcjet, { tokenBucket } from "@arcjet/next";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env["UPSTASH_REDIS_REST_URL"] ?? "",
  token: process.env["UPSTASH_REDIS_REST_TOKEN"] ?? "",
});

// Rate limiter for the public quote submission endpoint.
// 5 requests per IP per hour — balances accessibility with abuse prevention.
export const submissionRateLimiter = arcjet({
  key: process.env["ARCJET_KEY"] ?? "",
  rules: [
    tokenBucket({
      mode: "LIVE",
      characteristics: ["ip.src"],
      refillRate: 5,
      interval: "1h",
      capacity: 5,
    }),
  ],
});

export { redis };
