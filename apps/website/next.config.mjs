import { withContentlayer } from "next-contentlayer";
/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ["@lingsquare/ui"],
  reactStrictMode: true,
  swcMinify: true,
};

export default withContentlayer(nextConfig);
