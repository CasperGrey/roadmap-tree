// tailwind.config.js
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                'bg-dark': '#1C3559',
                'node-blue': '#204B87',
            },
            fontFamily: {
                'poppins': ['Poppins', 'sans-serif'],
            },
            animation: {
                'float-left': 'floatLeft 30s linear infinite',
                'float-right': 'floatRight 30s linear infinite',
            },
            keyframes: {
                floatLeft: {
                    '0%': { transform: 'translateX(3432px)', opacity: '0' },
                    '10%': { opacity: '0.7' },
                    '90%': { opacity: '0.7' },
                    '100%': { transform: 'translateX(-400px)', opacity: '0' },
                },
                floatRight: {
                    '0%': { transform: 'translateX(-400px)', opacity: '0' },
                    '10%': { opacity: '0.7' },
                    '90%': { opacity: '0.7' },
                    '100%': { transform: 'translateX(3432px)', opacity: '0' },
                },
            },
        },
    },
    plugins: [],
};