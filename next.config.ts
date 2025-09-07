import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Compression
  compress: true,
  // Enable static optimization
  output: 'standalone',
};

export default nextConfig;
