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
                'float-left': 'floatLeft 40s linear infinite',
                'float-right': 'floatRight 40s linear infinite',
            },
            keyframes: {
                floatLeft: {
                    '0%': { transform: 'translateX(0px)', opacity: '0' },
                    '5%': { opacity: '0.7' },
                    '95%': { opacity: '0.7' },
                    '100%': { transform: 'translateX(-3592px)', opacity: '0' }
                },
                floatRight: {
                    '0%': { transform: 'translateX(0px)', opacity: '0' },
                    '5%': { opacity: '0.7' },
                    '95%': { opacity: '0.7' },
                    '100%': { transform: 'translateX(3592px)', opacity: '0' }
                },
            },
        },
    },
    plugins: [],
};