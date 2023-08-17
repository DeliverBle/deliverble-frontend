/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://deliverble.kr',
  generateRobotsTxt: true,
  priority: 1,
  changefreq: 'weekly',
  exclude: ['/auth/*', '/fallback'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/', disallow: ['/auth/*', '/fallback'] }],
  },
};
