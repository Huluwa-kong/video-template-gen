/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'], // 添加这一行
  },
};

module.exports = nextConfig;
