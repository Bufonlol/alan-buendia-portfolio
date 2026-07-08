import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: process.env.NEXT_DIST_DIR || ".next",
  outputFileTracingRoot: __dirname,
  images: {
    qualities: [78, 90, 100],
  },
  experimental: {
    webpackBuildWorker: true,
    webpackMemoryOptimizations: true,
  },
  webpack: (config) => {
    // tooling artifacts (test logs, screenshots, archives) must not retrigger HMR
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        "**/node_modules/**",
        "**/.next/**",
        "**/.git/**",
        "**/.playwright-mcp/**",
        "**/.claude/**",
        "**/.agents/**",
        "**/_old-portfolio/**",
      ],
    };
    return config;
  },
};

export default nextConfig;
