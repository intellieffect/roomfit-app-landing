import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5252FF",
          50: "#EDEDFF",
          100: "#DBDBFF",
          200: "#B8B8FF",
          300: "#9494FF",
          400: "#7171FF",
          500: "#5252FF",
          600: "#1F1FFF",
          700: "#0000EB",
          800: "#0000B8",
          900: "#000085",
        },
        secondary: {
          DEFAULT: "#BAFC27",
          50: "#F4FFDC",
          100: "#EDFFC7",
          200: "#DEFF9E",
          300: "#D0FF75",
          400: "#C1FE4C",
          500: "#BAFC27",
          600: "#9FE002",
          700: "#78AA02",
          800: "#527401",
          900: "#2B3D01",
        },
      },
      fontFamily: {
        sans: ["Pretendard", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
