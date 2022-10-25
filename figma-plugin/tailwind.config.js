/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,tsx,html}"],
  theme: {
    extend: {
      fontFamily: "'Inter', sanse-serif",
      fontSize: {
        xs: "0.75rem",
        "2xs": "0.6875rem",
        "3xs": "0.625rem",
      },
      colors: {
        "figma-blue": "#18A0FB",
      },
      borderRadius: {
        3: 3,
      },
    },
  },
  plugins: [],
};
