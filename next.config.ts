import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "100MB",
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixaby.com",
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "fra.cloud.appwrite.io",
      },
    ],
  },
};

export default nextConfig;
