import React from 'react';

export default function PageHeader() {
    return (
        <g>
            {/* Background */}
            <rect width="3432" height="700" fill="#1C3559" />

            {/* Horizontal Lines */}
            {[100, 200].map(y => (
                <line
                    key={`white-${y}`}
                    x1="0"
                    y1={y}
                    x2="3432"
                    y2={y}
                    stroke="#ffffff"
                    strokeWidth="8"
                />
            ))}
            {[300, 400].map(y => (
                <line
                    key={`blue-${y}`}
                    x1="0"
                    y1={y}
                    x2="3432"
                    y2={y}
                    stroke="#204B87"
                    strokeWidth="8"
                />
            ))}

            {/* Decorative Elements */}
            <g>
                {/* Left Clouds */}
                <circle cx="400" cy="150" r="80" fill="#ffffff" opacity="0.7" />
                <circle cx="600" cy="180" r="60" fill="#ffffff" opacity="0.7" />

                {/* Right Clouds */}
                <circle cx="2800" cy="150" r="80" fill="#ffffff" opacity="0.7" />
                <circle cx="3000" cy="180" r="60" fill="#ffffff" opacity="0.7" />

                {/* Car */}
                <rect x="2600" y="190" width="60" height="30" fill="#ffffff" opacity="0.7" />
            </g>

            {/* Center Logo and Line */}
            <g transform="translate(1716, 400)">
                <image
                    href="/assets/logo.png"
                    x="-75"
                    y="-150"
                    width="150"
                    height="150"
                />
                <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="300"
                    stroke="#ffffff"
                    strokeWidth="8"
                />
            </g>
        </g>
    );
}