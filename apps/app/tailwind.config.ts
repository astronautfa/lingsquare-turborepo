const baseConfig = require("ui/tailwind.config");

module.exports = {
  ...baseConfig,
  content: [...baseConfig.content, "./src/**/*.{js,ts,jsx,tsx,mdx}"],
};
