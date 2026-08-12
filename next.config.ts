import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow unoptimized local images while photos aren't loaded yet
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
