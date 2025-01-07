import React from 'react';

export default function PageHeader() {
    return (
        <svg
            id="producttree"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 3432 2047"
            style={{ width: '100%', height: 'auto' }}
        >
            {/* Background */}
            <rect width="3432" height="2047" fill="#1C3559" />

            {/* Header */}
            <g>
                <image
                    xlinkHref="/assets/logo.svg" // Correct path for logo
                    x="50"
                    y="50"
                    width="200"
                    height="200"
                />
                <text
                    x="300"
                    y="150"
                    fill="#ffffff"
                    fontFamily="Poppins, sans-serif"
                    fontSize="100"
                    fontWeight="bold"
                >
                    AI Roadmap Tree
                </text>
                <text
                    x="300"
                    y="250"
                    fill="#ffffff"
                    fontFamily="Poppins, sans-serif"
                    fontSize="50"
                >
                    <tspan x="300" dy="1.2em">Home</tspan>
                    <tspan x="500" dy="0">About</tspan>
                </text>
            </g>

            {/* Clouds */}
            <g className="animate-cloud-drift">
                <circle cx="500" cy="300" r="100" fill="#ffffff" />
                <circle cx="650" cy="350" r="80" fill="#ffffff" />
            </g>

            {/* Trees */}
            <g>
                <rect x="100" y="1800" width="50" height="200" fill="#204B87" />
                <circle cx="125" cy="1700" r="100" fill="#1C3559" />
            </g>

            {/* Circuit Lines */}
            <g>
                <line x1="800" y1="400" x2="1600" y2="400" stroke="#ffffff" strokeWidth="10" />
                <line x1="1200" y1="400" x2="1200" y2="1000" stroke="#ffffff" strokeWidth="10" />
            </g>

            {/* Car */}
            <g className="animate-car-move">
                <path
                    d="M0,172v-172h172v172z"
                    fill="#26e07f"
                    transform="translate(100, 1800) scale(2)"
                />
            </g>
        </svg>
    );
}
