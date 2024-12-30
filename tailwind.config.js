/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
            'bg-dark': '#1C3559',
            'node-blue': '#204B87',
        },
      },
    },
    plugins: [],
  }