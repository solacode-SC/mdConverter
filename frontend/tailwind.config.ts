import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-bricolage)', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'sans-serif'],
        mono:    ['var(--font-jetbrains-mono)', 'monospace'],
      },
      colors: {
        brand: {
          blue:  '#3B6EF8',
          hover: '#2952D9',
        },
        surface: '#F7F8FA',
        card:    '#FFFFFF',
        muted:   '#EEF1F6',
        border:  '#E2E6ED',
        text: {
          primary: '#1A1D23',
          secondary: '#6B7280'
        }
      },
      boxShadow: {
        card: '0 1px 4px 0 rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
};
export default config;
