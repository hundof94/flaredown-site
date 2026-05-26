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
          DEFAULT: "#E0723F",
          light: "#EC9268",
          dark: "#C05828",
        },
        secondary: {
          DEFAULT: "#2DBF96",
          light: "#3EDBA8",
          dark: "#1E9070",
        },
        background: "#0C0A08",
        panel: "#080605",
        ink: {
          DEFAULT: "#EDE7DE",
          2: "#C0B3A4",
          3: "#6E6257",
        },
        surface: {
          DEFAULT: "#1A1714",
          2: "#231E1A",
        },
        source: {
          reddit: "#FF4500",
          x: "#E8E2DA",
          study: "#2DBF96",
          forum: "#D4A843",
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
      },
      animation: {
        pulse: "pulse 2s ease-in-out infinite",
        "slide-up": "slideUp 0.4s ease forwards",
        "fade-in": "fadeIn 0.3s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
