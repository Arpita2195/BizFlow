/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        espresso: "#3D2B1F",
        gold: "#C9A24B",
        charcoal: "#1A1512",
        bronze: "#8C7A5B",
        ivory: "#F4EFE6",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        sans: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(26,21,18,0.06), 0 2px 8px rgba(26,21,18,0.05)",
        card: "0 1px 3px rgba(26,21,18,0.08)",
      },
      borderRadius: {
        DEFAULT: "10px",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: 0, transform: "translateY(6px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
      },
      animation: {
        fadeIn: "fadeIn .4s ease-out",
      },
    },
  },
  plugins: [],
};
