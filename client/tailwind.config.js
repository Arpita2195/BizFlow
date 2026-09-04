/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        deepNavy: "#0F172A",
        charcoal: "#0F172A",
        espresso: "#0F172A",
        electricBlue: "#3B82F6",
        gold: "#3B82F6",
        skyBlue: "#3B82F6",
        slateGrey: "#64748B",
        bronze: "#64748B",
        cyanAccent: "#22D3EE",
        cyan: "#22D3EE",
        teal: "#22D3EE",
        turquoise: "#22D3EE",
        nearWhite: "#F8FAFC",
        ivory: "#F8FAFC",
      },
      fontFamily: {
        display: ["'Inter'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,23,42,0.06), 0 2px 8px rgba(15,23,42,0.05)",
        card: "0 1px 3px rgba(15,23,42,0.08)",
        cyanGlow: "0 0 15px rgba(34,211,238,0.3)",
        blueGlow: "0 0 15px rgba(59,130,246,0.3)",
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
