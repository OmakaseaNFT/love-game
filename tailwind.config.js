const { createThemes } = require("tw-colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "main": 'var(--font-family)'
      }
    },
  },
  plugins: [
    createThemes({
      love: {
        dialog: "#C1C1C1",
      },
      "vaporwave-arcade": {
        dialog: "rgba(255,255,255,.1)",
      },
      
    }),
  ],
};
