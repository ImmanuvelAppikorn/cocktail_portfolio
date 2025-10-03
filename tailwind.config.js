import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        // System fonts
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],

        // Custom fonts
        montagu: ["Montagu Slab"], // Montagu with Axiforma fallback
        axiforma: ["Axiforma"], // Direct Axiforma usage
      },
   colors: {
        primary: "#EB235C",   // pinkish red
        secondary: "#55EE81", // green
        tertiary: "#6148E6",  // purple
        gold: "#FFB860",    // yellow-gold
        re: "#EF3F48",   // red 
      },
    },
  },
  darkMode: "class", // class-based dark mode
  plugins: [heroui()], // Heroui plugin
}

module.exports = config
