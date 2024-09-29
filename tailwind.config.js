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
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [
    createThemes({
      love: {
        tab: "#C1C1C1",
        dialog: "#C1C1C1",
        "button-hover-bg": "#0A0080",
        "button-hover-text": "white",
        "reduced-text": 'rgb(31, 41, 55)'
      },
      "vaporwave-arcade": {
        dialog: "rgba(255,255,255,.2)",
        tab: "#7E71AC",
        "button-hover-bg": "#EC9B9B",
        "button-hover-text": "black",
        "reduced-text": 'rgb(75, 85, 99)',
      },
      
    }),
  ],
};
