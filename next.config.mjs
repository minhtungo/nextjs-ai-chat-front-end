import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "9ldo8wxnc3do2hc5.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
