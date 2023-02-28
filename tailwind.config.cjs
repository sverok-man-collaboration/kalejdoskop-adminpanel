/**
 * The default theme for Tailwind CSS.
 * @property {object} screens
 * @property {string} screens.sm
 * @property {string} screens.md
 * @property {string} screens.lg
 * @property {string} screens.xl
 * @property {string} screens.2xl
 * @see {@link https://tailwindcss.com/docs/theme Tailwind CSS theme documentation}
 */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "280px",
      ...defaultTheme.screens,
    },
    fontFamily: {
      header: ["DocumanHeavy", "sans-serif"],
      body: ["Open sans", "sans-serif"],
    },
    colors: {
      transparent: "transparent",
      primary: "#451499",
      secondary: "#c8b2ff",
      black: "#2d2d2d",
      grey: "#d9dbda",
      white: "#ffffff",
      accent: "#f7528b",
      accentHover: "#F41A65",
    },
    extend: {},
  },
  plugins: [],
};
