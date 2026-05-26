import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#C8522A",
          light: "#D97B56",
          dark: "#A03D1A",
        },
        secondary: {
          DEFAULT: "#1D6B5A",
          light: "#2A8A74",
          dark: "#144D41",
        },
        background: "#F7F4EF",
        ink: {
          DEFAULT: "#1A1612",
          2: "#4A3F35",
          3: "#8A7D72",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          2: "#F0EDE8",
        },
        source: {
          reddit: "#FF4500",
          x: "#000000",
          study: "#1D6B5A",
          forum: "#B8860B",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.1", fontWeight: "700" }],
        h1: ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["2rem", { lineHeight: "1.25", fontWeight: "600" }],
        h3: ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.65" }],
        meta: ["0.875rem", { lineHeight: "1.5" }],
      },
      borderRadius: {
        card: "12px",
        pill: "9999px",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        barFill: {
          "0%": { width: "0%" },
          "100%": { width: "var(--bar-width)" },
        },
      },
      animation: {
        pulse: "pulse 2s ease-in-out infinite",
        "slide-up": "slideUp 0.4s ease forwards",
        "fade-in": "fadeIn 0.3s ease forwards",
        "bar-fill": "barFill 0.8s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
