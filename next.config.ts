import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-7e20a1b4-7b10-4c8c-bb75-8ce12caad67d.space-z.ai",
    "*.space-z.ai",
  ],
};

export default nextConfig;
