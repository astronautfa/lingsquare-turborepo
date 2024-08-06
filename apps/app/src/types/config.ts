import type { Theme } from "@lingsquare/misc/constants"

export type ThemeConfig = {
  theme: Theme["name"] | "default";
  radius: 0 | 0.3 | 0.5 | 0.75 | 1.0 | "default";
};
