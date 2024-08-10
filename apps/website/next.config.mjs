import { withContentlayer } from "next-contentlayer";
/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ["@lingsquare/ui", "@lingsquare/misc"],
  reactStrictMode: true,
  swcMinify: true,
};

export default withContentlayer(nextConfig);
