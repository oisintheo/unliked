/** @type {import('next').NextConfig} */
require('dotenv').config({ path: '../../.env.local' });

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = {
  ...nextConfig,
  reactStrictMode: true,
  // transpilePackages: ['ui', '@unliked/types'],
};
