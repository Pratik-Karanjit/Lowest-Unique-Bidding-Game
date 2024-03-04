/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8c52ff",
        primaryDark: "#5b2bbb",
        primaryLight: "#c0a0ff",
        primaryBg: "#e9deff",
        secondary: "#0d9453",
        textGrey: "#7B7B7B",
        background: "#f9f6ff",
      },
    },
  },
  plugins: [],
};
