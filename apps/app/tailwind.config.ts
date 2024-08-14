const baseConfig = require("@lingsquare/ui/tailwind.config");

module.exports = {
  ...baseConfig,
  content: [...baseConfig.content, "./src/**/*.{js,ts,jsx,tsx,mdx}", "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
