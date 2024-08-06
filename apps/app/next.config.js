/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { fileURLToPath } from "node:url";

import createJiti from "jiti";

const jiti = createJiti(fileURLToPath(import.meta.url));

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

jiti("@lingsquare/env/web/server");
jiti("@lingsquare/env/web/client");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["@lingsquare/ui", "@lingsquare/env", "@lingsquare/auth", "@lingsquare/trpc", "@lingsquare/email", "@lingsquare/misc"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    typedRoutes: true,
  },
};

export default withNextIntl(config);
