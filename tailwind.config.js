import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
],

  theme: {
    screens: {
      "2xs": "300px",
      xs: "375px",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        montagu: ["Montagu Slab"],
        mulish: ["Mulish"],
        poppins: ["Poppins"],
        axiforma: ["Axiforma"],
      },
      colors: {
        primary: "#EB235C",
        secondary: "#55EE81",
        tertiary: "#6148E6",
        gold: "#FFB860",
        darkred: "#EF3F48",
      },
      boxShadow: {
        "custom-double":
          "0 4px 4px 0 rgba(0,0,0,0.25), 4px 0 4px 0 rgba(0,0,0,0.25)",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

module.exports = config;
