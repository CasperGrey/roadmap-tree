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
                'float-left': 'floatLeft 20s linear infinite',
                'float-right': 'floatRight 20s linear infinite',
            },
            keyframes: {
                floatLeft: {
                    '0%': { transform: 'translate(100%)' },
                    '100%': { transform: 'translate(-100%)' }
                },
                floatRight: {
                    '0%': { transform: 'translate(-100%)' },
                    '100%': { transform: 'translate(100%)' }
                },
            },
        },
    },
    plugins: [],
};