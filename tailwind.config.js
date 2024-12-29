/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          foundation: '#4338ca',
          productivity: '#3b82f6',
          'tree-text': '#1a2b4b',
          'tree-description': '#64748b',
        },
      },
    },
    plugins: [],
  }