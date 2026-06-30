/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
      },
      fontFamily: {
        bodyFont: ["Inter", "sans-serif"],
        titleFont: ["Inter", "sans-serif"],
      },
      colors: {
        bodyColor: "#FFFFFF",
        cardColor: "#F5F7FA",
        lightText: "#111827",
        mutedText: "#6B7280",
        designColor: "#2EA88A",
        greenAccent: "#2B8EC9",
      },
      boxShadow: {
        shadowOne: "0 0 0 1px rgba(17, 24, 39, 0.08)",
        glowBlue: "0 0 40px rgba(46, 168, 138, 0.12)",
      },
      transitionDelay: {
        '0': '0ms',
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },
    },
  },
  plugins: [],
};
