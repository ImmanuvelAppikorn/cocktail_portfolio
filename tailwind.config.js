import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // System fonts
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],

        // Custom fonts from public/fonts
        montagu: ["Montagu Slab"], // Montagu Slab with serif fallback
        mulish: ["Mulish", ], // Mulish with sans-serif fallback
        poppins: ["Poppins", ], // Poppins with sans-serif fallback
        axiforma: ["Axiforma", ], // Axiforma with sans-serif fallback
      },
      colors: {
        primary: "#EB235C", // pinkish red
        secondary: "#55EE81", // green
        tertiary: "#6148E6", // purple
        gold: "#FFB860", // yellow-gold
        darkred: "#EF3F48", // red
      },
    },
  },
  darkMode: "class", // class-based dark mode
  plugins: [heroui()], // Heroui plugin
};

module.exports = config;
