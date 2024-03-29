/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['img.youtube.com'],
    formats: ['image/avif', 'image/webp'],
  },
  i18n: {
    locales: ['ko'],
    defaultLocale: 'ko',
  },
  async redirects() {
    return [
      {
        source: '/fallback',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
