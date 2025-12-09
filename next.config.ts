import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Tùy chọn cho production
  images: {
    domains: ['images.unsplash.com'], // Cho phép image từ Unsplash
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: { ignoreBuildErrors: true },
  experimental: { optimizeCss: false },
};

export default nextConfig;

