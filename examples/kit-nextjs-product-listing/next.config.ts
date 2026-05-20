import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  distDir: process.env.NEXTJS_DIST_DIR || '.next',

  productionBrowserSourceMaps: process.env.GENERATE_SOURCEMAP === 'true',

  reactStrictMode: true,

  poweredByHeader: false,

  compress: true,

  // Replit dev: allow the proxied iframe origin so Next 16 stops blocking it
  allowedDevOrigins: [
    '*.replit.dev',
    '*.riker.replit.dev',
    '*.replit.app',
  ],

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'edge*.**', port: '' },
      { protocol: 'https', hostname: 'xmc-*.**', port: '' },
      { protocol: 'https', hostname: 'images.unsplash.com', port: '' },
      { protocol: 'https', hostname: 'images.pexels.com', port: '' },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    unoptimized: process.env.NODE_ENV === 'development',
  },

  rewrites: async () => {
    return [
      { source: '/sitemap.xml', destination: '/api/sitemap', locale: false },
      { source: '/sitemap-:id(\\d+).xml', destination: '/api/sitemap', locale: false },
      { source: '/sitemap-llm.xml', destination: '/api/sitemap-llm', locale: false },
      { source: '/robots.txt', destination: '/api/robots', locale: false },
      { source: '/llms.txt', destination: '/api/llms-txt', locale: false },
      { source: '/ai/summary.json', destination: '/api/ai/summary', locale: false },
      { source: '/ai/faq.json', destination: '/api/ai/faq', locale: false },
      { source: '/ai/service.json', destination: '/api/ai/service', locale: false },
      { source: '/ai/markdown/:path*', destination: '/api/ai/markdown/:path*', locale: false },
      { source: '/.well-known/ai.txt', destination: '/api/well-known/ai-txt', locale: false },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
