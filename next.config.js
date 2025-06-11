/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.etimg.com",
      },
      {
        protocol: "https",
        hostname: "media.news.climate.columbia.edu",
      },
      {
        protocol: "https",
        hostname: "**.newsapi.org",
      },
      {
        protocol: "https",
        hostname: "**.nytimes.com",
      },
      {
        protocol: "https",
        hostname: "**.reuters.com",
      },
      {
        protocol: "https",
        hostname: "**.bloomberg.com",
      },
      {
        protocol: "https",
        hostname: "**.wsj.com",
      },
      {
        protocol: "https",
        hostname: "**.cnbc.com",
      },
      {
        protocol: "https",
        hostname: "**.bbc.com",
      },
      {
        protocol: "https",
        hostname: "**.guardian.co.uk",
      },
    ],
  },
};

module.exports = nextConfig;
