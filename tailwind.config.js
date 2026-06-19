/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        blush: "#fff8e8",
        rosewood: "#b8892f",
        ink: "#241f17",
        mist: "#fffaf0",
        sage: "#f7edcf",
        marigold: "#d8a739",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
