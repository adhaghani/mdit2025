import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],

  // Performance optimizations
  experimental: {
    // Removed optimizeCss: true to fix critters module error
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-*", // Wildcard for all Radix packages
      "motion/react", // Specific motion imports
    ],
  },
  // Optimize images
  images: {
    unoptimized: true, // Keep basic optimization but minimal processin
  },

  // Compress responses
  compress: true,
};

export default nextConfig;
