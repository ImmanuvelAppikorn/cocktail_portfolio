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
        montagu: ["'Montagu Slab'", "Axiforma", "serif"], // Montagu with Axiforma fallback
        axiforma: ["Axiforma", "sans-serif"], // Direct Axiforma usage
      },
      colors: {
        // Add custom colors if needed
      },
    },
  },
  darkMode: "class", // class-based dark mode
  plugins: [heroui()], // Heroui plugin
}

module.exports = config
