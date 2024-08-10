import createMDX from "fumadocs-mdx/config";
const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@lingsquare/ui", "@lingsquare/misc"],
  reactStrictMode: true,
  swcMinify: true,
};

export default withMDX(nextConfig);
