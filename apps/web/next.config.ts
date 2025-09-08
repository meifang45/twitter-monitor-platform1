import type { NextConfig } from "next";
import path from 'path';

const imageDomains: string[] = (process.env.IMAGE_DOMAINS || 'pbs.twimg.com,via.placeholder.com')
  .split(',')
  .map(d => d.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  
  // Production optimizations
  poweredByHeader: false,
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: imageDomains,
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Select fonts implementation at build time via alias
  webpack: (config) => {
    const enableFonts = process.env.ENABLE_GOOGLE_FONTS === 'true';
    const aliasTarget = enableFonts ? 'fonts.google' : 'fonts.offline';
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['@/lib/fonts'] = path.resolve(__dirname, `src/lib/${aliasTarget}.ts`);
    return config;
  },
};

export default nextConfig;
