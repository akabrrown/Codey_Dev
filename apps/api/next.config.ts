import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@codey/engine", "@codey/validators", "@codey/db", "@codey/email"],
  experimental: {
    serverActions: { allowedOrigins: ["localhost:3000", "localhost:3001"] },
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
