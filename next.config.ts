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

    turbo: {
      resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
    },
  },
  // Optimize images
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Enhanced optimization settings
    dangerouslyAllowSVG: true, // Allow SVG optimization
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Optimize for your specific use case
    domains: [], // Add external domains if needed
    remotePatterns: [], // For external images
    qualities: [85], // Define quality levels for optimization
  },

  // Compress responses
  compress: true,
};

export default nextConfig;
