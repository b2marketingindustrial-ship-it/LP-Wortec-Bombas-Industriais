/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,

  output: 'export',
  trailingSlash: true,
  basePath: '/lp/bombasindustriais',
  assetPrefix: '/lp/bombasindustriais/',

  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  experimental: {
    optimizePackageImports: ['framer-motion', 'swiper'],
  },
};

export default nextConfig;
