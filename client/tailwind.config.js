/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-to-br-custom":
          "linear-gradient(to bottom right, rgba(125, 213, 111, 0.85), rgba(40, 180, 135, 0.85))",
        "text-gradient": " linear-gradient(to right, #7dd56f, #28b487);",
        "gradient-bg-section":
          "linear-gradient(to right bottom, #7dd56f, #28b487);",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".line-clamp-1": {
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "1",
          overflow: "hidden",
        },
      };

      addUtilities(newUtilities);
    },

    function ({ addUtilities }) {
      const newUtilities = {
        ".heading-secondary": {
          fontSize: "1.5rem",
          textTransform: "uppercase",
          fontWeight: "700",
          backgroundImage: "linear-gradient(to right, #7dd56f, #28b487)",
          "-webkit-background-clip": "text",
          color: "transparent",
          letterSpacing: "0.1rem",
          lineHeight: "1.3",
          display: "inline-block",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },

    function ({ addUtilities }) {
      const newUtilities = {
        ".heading-primary": {
          padding: "1rem 1.5rem",
          lineHeight: "1",
          "-webkit-box-decoration-break": "clone",
          backgroundImage:
            "linear-gradient(to bottom right, rgba(125, 213, 111, 0.85), rgba(40, 180, 135, 0.85))",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
