/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'foundation': '#4F46E5',
          'productivity': '#2563EB',
          'advanced': '#0EA5E9',
        },
        spacing: {
          'tree-node': '80px',
          'tree-level': '250px',
          'tree-sibling': '450px',
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          }
        }
      },
    },
    plugins: [],
  }