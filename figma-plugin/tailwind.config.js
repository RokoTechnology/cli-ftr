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
        "accent-blue": "#18A0FB",
        "basic-gray": "#F0F0F0",
        "basic-black": "#000000",
        "basic-black-3": "rgba(0,0,0,0.3)",
        "basic-black-8": "rgba(0,0,0,0.8)",
        "basic-white-4": "rgba(255,255,255,0.4)",
        "basic-white-8": "rgba(255,255,255,0.8)",
      },
      borderRadius: {
        3: 3,
      },
    },
  },
  plugins: [],
};
