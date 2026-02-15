import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"], // Crucial for the theme toggle to work
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This connects to the variable we defined in app/layout.tsx
        sans: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Optional: helps style markdown content nicely
  ],
};
export default config;