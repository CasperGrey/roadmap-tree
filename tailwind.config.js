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
                'cloud-drift': 'cloudDrift 20s linear infinite',
                'car-move': 'carMove 10s linear infinite',
            },
            keyframes: {
                cloudDrift: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100vw)' },
                },
                carMove: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(100vw)' },
                },
            },
        },
    },
    plugins: [],
};
