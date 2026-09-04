import arcjet, { tokenBucket } from "@arcjet/next";
import { Redis } from "@upstash/redis";

function createRedisClient() {
  const url = process.env["UPSTASH_REDIS_REST_URL"];
  const token = process.env["UPSTASH_REDIS_REST_TOKEN"];
  if (!url || !token || !url.startsWith("http")) {
    return null;
  }
  try {
    return new Redis({ url, token });
  } catch {
    return null;
  }
}

export const redis = createRedisClient();

const arcjetKey = process.env["ARCJET_KEY"];

export const submissionRateLimiter =
  arcjetKey && !arcjetKey.includes("ajkey_xxx")
    ? arcjet({
        key: arcjetKey,
        rules: [
          tokenBucket({
            mode: "LIVE",
            characteristics: ["ip.src"],
            refillRate: 5,
            interval: "1h",
            capacity: 5,
          }),
        ],
      })
    : {
        protect: async () => ({
          isDenied: () => false,
          isErrored: () => false,
          reason: null,
        }),
      };
