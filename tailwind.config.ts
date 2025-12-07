import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "rgb(var(--primary-color) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary-color) / <alpha-value>)",
        },
        defaultBlack: "var(--default-black-color)",
        danger: "var(--danger-color)",
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(90deg, rgb(var(--primary-color)) 40%, rgb(var(--secondary-color)) 180%)",
        "gradient-orange": "linear-gradient(180deg, #f25b5b 35%, #ffd045 100%)",
        "gradient-green":
          "linear-gradient(0deg, rgb(var(--primary-color)) 40%, rgb(var(--secondary-color)) 180%)",
      },
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        rotate: "rotate linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
