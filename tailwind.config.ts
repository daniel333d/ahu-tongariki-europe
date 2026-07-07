import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#071426",
        ink: "#102033",
        sand: "#d8c7a2",
        stone: "#8f8b80",
        gold: "#b89648",
        ivory: "#f4efe5"
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "system-ui", "sans-serif"],
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        polynesian: ["var(--font-polynesian)", "Cinzel", "serif"]
      },
      boxShadow: {
        premium: "0 24px 70px rgba(7, 20, 38, 0.16)",
        architectural: "0 34px 90px rgba(7, 20, 38, 0.22)"
      }
    }
  },
  plugins: []
};

export default config;
