/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['img.youtube.com'],
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

module.exports = nextConfig;
