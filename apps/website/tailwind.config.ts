import type { Config } from "tailwindcss";
import { createPreset } from '@lingsquare/docs-ui/tailwind-plugin';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    './content/**/*.{md,mdx}',
    './mdx-components.{ts,tsx}',
    './node_modules/@lingsquare/docs-ui/dist/**/*.js',
  ],
  presets: [createPreset()],
  theme: {
    extend: {
      lineClamp: {
        15: "15",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "card-visible-md": {
          "0%": {
            transform: "rotate3d(0, 0, 0, 0) translate3d(0, 0px, 0px)",
          },
          "20%": {
            transform:
              "rotate3d(0, 0.2, -5, 5deg) translate3d(80px, 10px, 0px)",
          },
          "95%": {
            transform:
              "rotate3d(0, 0.2, 0, 180deg) translate3d(0px, calc(150% - 50vh), 0px) scale(2)",
          },
          "100%": {
            transform:
              "rotate3d(0, 0.2, 0, 180deg) translate3d(0px, calc(150% - 50vh), 0px) scale(2)",
          },
        },
        "card-on-stack-md": {
          "0%": {
            transform:
              "rotate3d(0, 0.2, 0, 180deg) translate3d(0px, calc(150% - 50vh), 0px) scale(2)",
          },
          "5%": {
            transform:
              "rotate3d(0, 0.2, 0, 180deg) translate3d(0px, calc(150% - 50vh), 0px) scale(2)",
          },
          "100%": {
            transform: "rotate3d(0, 0, 0, 0) translate3d(0, 0px, 0px)",
          },
        },
        "card-visible-lg": {
          "0%": {
            transform: "rotate3d(0, 0, 0, 0) translate3d(0, 0px, 0px)",
          },
          "20%": {
            transform:
              "rotate3d(0, 0.2, -5, 5deg) translate3d(80px, 10px, 0px)",
          },
          "95%": {
            transform:
              "rotate3d(0, 0.2, 0, 180deg) translate3d(0px, calc(100% - 60vh), 0px) scale(1.5)",
          },
          "100%": {
            transform:
              "rotate3d(0, 0.2, 0, 180deg) translate3d(0px, calc(100% - 60vh), 0px) scale(1.5)",
          },
        },
        "card-on-stack-lg": {
          "0%": {
            transform:
              "rotate3d(0, 0.2, 0, 180deg) translate3d(0px, calc(100% - 60vh), 0px) scale(1.5)",
          },
          "5%": {
            transform:
              "rotate3d(0, 0.2, 0, 180deg) translate3d(0px, calc(100% - 60vh), 0px) scale(1.5)",
          },
          "100%": {
            transform: "rotate3d(0, 0, 0, 0) translate3d(0, 0px, 0px)",
          },
        },
        "card-details": {
          "0%": {
            opacity: "0",
            pointerEvents: "none",
          },
          "90%": {
            opacity: "0",
            pointerEvents: "none",
          },
          "100%": {
            opacity: "1",
            pointerEvents: "auto",
          },
        },
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "card-visible-md": "card-visible-md 0.8s ease-in-out forwards",
        "card-hidden-md": "card-on-stack-md 0.8s ease-in-out forwards",
        "card-visible-lg": "card-visible-lg 0.8s ease-in-out forwards",
        "card-hidden-lg": "card-on-stack-lg 0.8s ease-in-out forwards",
        "card-details": "card-details 0.8s ease-in-out forwards",
        "card-details-hidden": "card-details 0.8s ease-in-out reverse",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
