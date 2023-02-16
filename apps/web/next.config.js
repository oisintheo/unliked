/** @type {import('next').NextConfig} */
require('dotenv').config({ path: `../../.env.${process.env.NODE_ENV}` });

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
