// Updated PageHeader.tsx (Aligned with PDF Design)
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

            {/* Horizontal Lines in Header */}
            <line x1="0" y1="200" x2="3432" y2="200" stroke="#ffffff" strokeWidth="8" />
            <line x1="0" y1="300" x2="3432" y2="300" stroke="#ffffff" strokeWidth="8" />
            <line x1="0" y1="400" x2="3432" y2="400" stroke="#204B87" strokeWidth="8" />
            <line x1="0" y1="500" x2="3432" y2="500" stroke="#204B87" strokeWidth="8" />

            {/* Logo and Center Line */}
            <g transform="translate(1716, 100)">
                <image
                    xlinkHref="/assets/logo.svg"
                    x="-75"
                    y="0"
                    width="150"
                    height="150"
                />
                <line x1="0" y1="150" x2="0" y2="1000" stroke="#ffffff" strokeWidth="8" />
            </g>

            {/* Clouds */}
            <g className="animate-cloud-drift">
                <circle cx="500" cy="150" r="120" fill="#ffffff" />
                <circle cx="700" cy="200" r="100" fill="#ffffff" />
                <circle cx="2500" cy="150" r="120" fill="#ffffff" />
                <circle cx="2700" cy="200" r="100" fill="#ffffff" />
            </g>

            {/* Circuit Lines */}
            <g>
                <line x1="1500" y1="1100" x2="2200" y2="1100" stroke="#ffffff" strokeWidth="8" />
                <line x1="1850" y1="1100" x2="1850" y2="1500" stroke="#ffffff" strokeWidth="8" />
            </g>

            {/* Trees */}
            <g>
                <rect x="1650" y="1800" width="80" height="200" fill="#204B87" />
                <circle cx="1690" cy="1720" r="120" fill="#1C3559" />
            </g>
        </svg>
    );
}
