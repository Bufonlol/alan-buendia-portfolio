import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
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
