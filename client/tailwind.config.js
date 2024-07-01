/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-to-br-custom":
          "linear-gradient(to bottom right, rgba(125, 213, 111, 0.85), rgba(40, 180, 135, 0.85))",
        "text-gradient": "linear-gradient(to right, #7dd56f, #28b487)",
        "gradient-bg-section":
          "linear-gradient(to right bottom, #70dad3, #e8f3f3)",
        // "gradient-bg-section":
        //   "linear-gradient(to right bottom, #7dd56f, #28b487)",
      },
      colors: {
        "primary-100": "#6fece4",
        "primary-40": "#70dad3",
        "primary-20": "#bdf3f0",
        "primary-10": "#e8f3f3",
        "primary-text": "#3b4948",
        "accent-100": "#ec8c6f",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".line-clamp-2": {
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "2",
          overflow: "hidden",
        },
        ".heading-secondary": {
          fontSize: "1.2rem",
          textTransform: "uppercase",
          fontWeight: "700",
          backgroundImage: "linear-gradient(to right bottom, #70dad3, #e8f3f3)",
          "-webkit-background-clip": "text",
          color: "transparent",
          letterSpacing: "0.1rem",
          lineHeight: "1.3",
          display: "inline-block",
        },
        ".heading-primary": {
          padding: "1rem 1.5rem",
          lineHeight: "1",
          "-webkit-box-decoration-break": "clone",
          backgroundImage: "linear-gradient(to right bottom, #70dad3, #e8f3f3)",
        },

        ".dashboard_activeLink": { borderLeft: "4px solid #fff !important" },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
