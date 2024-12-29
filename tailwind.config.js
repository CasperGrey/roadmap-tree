/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          'ract-blue': '#003087',      // Primary blue
          'ract-navy': '#1B365D',      // Dark blue
          'ract-red': '#ED1C24',       // Red accent
          'ract-light': '#EEF2F6',     // Light background
          'ract-grey': '#58595B'       // Text grey
        },
      },
    },
    plugins: [],
  }