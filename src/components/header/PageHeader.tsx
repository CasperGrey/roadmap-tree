// Updated PageHeader.tsx (Focused on Line Spacing and Header Scaling)
import React from 'react';

export default function PageHeader() {
    return (
        <svg
            id="producttree"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 3432 2000" /* Adjusted to ensure tree visibility */
            style={{ width: '100%', height: 'auto' }}
        >
            {/* Background */}
            <rect width="3432" height="2000" fill="#1C3559" />

            {/* Horizontal Lines in Header */}
            <line x1="0" y1="100" x2="3432" y2="100" stroke="#ffffff" strokeWidth="8" />
            <line x1="0" y1="150" x2="3432" y2="150" stroke="#ffffff" strokeWidth="8" />
            <line x1="0" y1="200" x2="3432" y2="200" stroke="#204B87" strokeWidth="8" />
            <line x1="0" y1="250" x2="3432" y2="250" stroke="#204B87" strokeWidth="8" />

            {/* Centered Logo and Vertical Line */}
            <g transform="translate(1716, 300)">
                <image
                    xlinkHref="/assets/logo.png"
                    x="-75"
                    y="0"
                    width="150"
                    height="150"
                />
                <line x1="0" y1="150" x2="0" y2="1600" stroke="#ffffff" strokeWidth="8" />
            </g>

            {/* Clouds */}
            <g>
                <circle cx="500" cy="50" r="120" fill="#ffffff" />
                <circle cx="700" cy="80" r="100" fill="#ffffff" />
                <circle cx="2500" cy="50" r="120" fill="#ffffff" />
                <circle cx="2700" cy="80" r="100" fill="#ffffff" />
            </g>

            {/* Tree Lines */}
            <g>
                {/* Horizontal Lines for the Tree */}
                <line x1="1716" y1="1600" x2="1000" y2="1600" stroke="#ffffff" strokeWidth="8" />
                <line x1="1716" y1="1600" x2="2400" y2="1600" stroke="#ffffff" strokeWidth="8" />
                {/* Vertical Line for Tree Extension */}
                <line x1="1716" y1="1600" x2="1716" y2="1900" stroke="#ffffff" strokeWidth="8" />
            </g>

            {/* Tree Base (Rectangle and Circle for Visual) */}
            <g>
                <rect x="1640" y="1900" width="150" height="100" fill="#204B87" />
                <circle cx="1716" cy="1850" r="80" fill="#1C3559" />
            </g>
        </svg>
    );
}
