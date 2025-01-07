// Updated PageHeader.tsx (Precise Alignment with PDF Design)
import React from 'react';

export default function PageHeader() {
    return (
        <svg
            id="producttree"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 3432 3432" /* Adjusted to encompass the entire layout */
            style={{ width: '100%', height: 'auto' }}
        >
            {/* Background */}
            <rect width="3432" height="3432" fill="#1C3559" />

            {/* Horizontal Lines in Header */}
            <line x1="0" y1="200" x2="3432" y2="200" stroke="#ffffff" strokeWidth="8" />
            <line x1="0" y1="300" x2="3432" y2="300" stroke="#ffffff" strokeWidth="8" />
            <line x1="0" y1="400" x2="3432" y2="400" stroke="#204B87" strokeWidth="8" />
            <line x1="0" y1="500" x2="3432" y2="500" stroke="#204B87" strokeWidth="8" />

            {/* Centered Logo and Vertical Line */}
            <g transform="translate(1716, 500)">
                <image
                    xlinkHref="/assets/logo.png"
                    x="-75"
                    y="0"
                    width="150"
                    height="150"
                />
                <line x1="0" y1="150" x2="0" y2="2600" stroke="#ffffff" strokeWidth="8" />
            </g>

            {/* Clouds */}
            <g>
                <circle cx="500" cy="100" r="150" fill="#ffffff" />
                <circle cx="700" cy="200" r="120" fill="#ffffff" />
                <circle cx="2500" cy="100" r="150" fill="#ffffff" />
                <circle cx="2700" cy="200" r="120" fill="#ffffff" />
            </g>

            {/* Tree Lines */}
            <g>
                {/* Horizontal Lines for the Tree */}
                <line x1="1716" y1="2600" x2="1000" y2="2600" stroke="#ffffff" strokeWidth="8" />
                <line x1="1716" y1="2600" x2="2400" y2="2600" stroke="#ffffff" strokeWidth="8" />
                {/* Vertical Line for Tree Extension */}
                <line x1="1716" y1="2600" x2="1716" y2="3000" stroke="#ffffff" strokeWidth="8" />
            </g>

            {/* Tree Base (Rectangle and Circle for Visual) */}
            <g>
                <rect x="1640" y="3000" width="150" height="200" fill="#204B87" />
                <circle cx="1716" cy="2920" r="100" fill="#1C3559" />
            </g>
        </svg>
    );
}
