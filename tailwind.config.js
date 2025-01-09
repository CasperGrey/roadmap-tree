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
                'float-left': 'floatLeft 60s linear infinite',
                'float-right': 'floatRight 60s linear infinite',
            },
            keyframes: {
                floatLeft: {
                    '0%': { transform: 'translateX(3432px)' },
                    '100%': { transform: 'translateX(-200px)' }
                },
                floatRight: {
                    '0%': { transform: 'translateX(-200px)' },
                    '100%': { transform: 'translateX(3432px)' }
                },
            },
        },
    },
    plugins: [],
};