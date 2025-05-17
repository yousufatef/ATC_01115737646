import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "utfs.io",
      "images.pexels.com",
      "unsplash.com",
      "images.unsplash.com", // You need to add this specifically
      "cdn.example.com"
    ],
  },
};

export default nextConfig;