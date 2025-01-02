/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        iconBarDark: "#1E1F22",
        iconBarLight: "#e3e5e8",
        sidebarDark: "#2B2D31",
        sidebarLight: "#f2f3f5",
        mainDark: "#313338",
        mainLight: "#ffffff",
        separatorDark: "#1f2937",
        separatorLight: "#e5e7eb",
      },
    },
  },
  plugins: [],
};
