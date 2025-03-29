/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
        secondary: {
          50: "#f0f9ff",
          100: "#e0f4fe",
          200: "#bae8fd",
          300: "#7dd8fc",
          400: "#51c1ef", // Votre nouvelle couleur de référence
          500: "#2aa5de",
          600: "#1889c7",
          700: "#1670a7",
          800: "#155c89",
          900: "#164e73",
          950: "#0f3351",
        },
        accent: {
          50: "#fff3f2",
          100: "#ffe5e3",
          200: "#ffcfcb",
          300: "#fdb0ab",
          400: "#FA6E62", // Votre nouvelle couleur de référence
          500: "#f44336",
          600: "#e53935",
          700: "#d32f2f",
          800: "#c62828",
          900: "#b71c1c",
          950: "#7f0000",
        },
        warning: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
          950: "#422006",
        },
      },
      backgroundImage: {
        "glow-gradient":
          "linear-gradient(45deg, #fff, #51c1ef, #59f0ba, #59f0ba, #51c1ef, #fff)",
        gradient1:
          "linear-gradient(to left, #ffcf4d, #ff9652, #ff49ad, #ae3af8)",
        gradient2: "linear-gradient(to left, #d87cef, #e53a3a)",
        gradient3: "linear-gradient(89.02deg, #8c7cef 1.21%, #af3ae6 54.8%)",
        "gradient-btn": "linear-gradient(to right, #59F0BA, #51C1EF)",
      },
      fontFamily: {
        "league-spartan": "var(--font-league-spartan)",
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Lexend", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-in-out",
        "slide-down": "slideDown 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
};
