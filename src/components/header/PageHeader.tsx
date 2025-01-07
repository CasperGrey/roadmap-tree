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
            <g transform="translate(100, 100)">
                <image
                    xlinkHref="/assets/logo.png"
                    x="0"
                    y="0"
                    width="150"
                    height="150"
                />
                <text
                    x="200"
                    y="75"
                    fill="#ffffff"
                    fontFamily="Poppins, sans-serif"
                    fontSize="80"
                    fontWeight="bold"
                >
                    AI Roadmap Tree
                </text>
                <g transform="translate(200, 130)">
                    <text
                        x="0"
                        y="0"
                        fill="#ffffff"
                        fontFamily="Poppins, sans-serif"
                        fontSize="50"
                    >
                        Home
                    </text>
                    <text
                        x="200"
                        y="0"
                        fill="#ffffff"
                        fontFamily="Poppins, sans-serif"
                        fontSize="50"
                    >
                        About
                    </text>
                </g>
            </g>

            {/* Clouds */}
            <g className="animate-cloud-drift">
                <circle cx="800" cy="300" r="120" fill="#ffffff" />
                <circle cx="1000" cy="350" r="100" fill="#ffffff" />
            </g>

            {/* Trees */}
            <g>
                <rect x="150" y="1800" width="80" height="200" fill="#204B87" />
                <circle cx="190" cy="1720" r="120" fill="#1C3559" />
            </g>

            {/* Circuit Lines */}
            <g>
                <line x1="1200" y1="500" x2="2200" y2="500" stroke="#ffffff" strokeWidth="8" />
                <line x1="1700" y1="500" x2="1700" y2="1200" stroke="#ffffff" strokeWidth="8" />
            </g>

            {/* Car */}
            <g className="animate-car-move">
                <path
                    d="M0,172v-172h172v172z"
                    fill="#26e07f"
                    transform="translate(400, 1850) scale(2)"
                />
            </g>
        </svg>
    );
}
