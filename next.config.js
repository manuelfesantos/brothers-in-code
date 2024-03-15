/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "floral-hill-5d85.manuelfesantos.workers.dev",
      },
    ],
  },
};

module.exports = nextConfig;
