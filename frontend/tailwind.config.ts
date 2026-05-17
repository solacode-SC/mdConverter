import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        border: "#e5e7eb",
        primary: "#111827",
        muted: "#6b7280"
      },
    },
  },
  plugins: [],
};
export default config;
