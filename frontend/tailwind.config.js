/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        iconBarDark: "#1E1F22",
        iconBarLight: "white",
        sidebarDark: "#2B2D31",
        sidebarLight: "white",
        mainDark: "#313338",
        mainLight: "white",
      },
    },
  },
  plugins: [],
};
