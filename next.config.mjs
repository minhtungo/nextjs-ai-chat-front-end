import createNextIntlPlugin from "next-intl/plugin";
import { config } from "process";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    serverComponentsExternalPackages: ["pino", "pino-pretty"],
  },
  transpilePackages: ["react-pdf-highlighter"],
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "9ldo8wxnc3do2hc5.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "assets.lumi-ai.io",
      },
      {
        protocol: "http",
        hostname: "assets.lumi-ai.io",
      },
      {
        protocol: "http",
        hostname: "localhost:9000",
      },
    ],
  },
};

export default withNextIntl(nextConfig);

// async rewrites() {
//   return [
//     {
//       source: "/api/:path*",
//       destination: "http://localhost:5000/api/:path*",
//     },
//   ];
// },
