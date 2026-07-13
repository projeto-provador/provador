import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0B1120",
        card: "#17203A",
        card2: "#1E2A4A",
        borda: "#243154",
        neural: "#00DC82",
        blue: "#3B82F6",
        blueLight: "#60A5FA",
        amber: "#F5B301",
        rose: "#F26D6D",
        muted: "#94A3B8",
        muted2: "#64748B",
      },
      fontFamily: {
        title: ["var(--font-poppins)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Cambria", "Georgia", "serif"],
      },
      borderRadius: {
        card: "16px",
        card2: "14px",
      },
      boxShadow: {
        card: "0 8px 30px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
