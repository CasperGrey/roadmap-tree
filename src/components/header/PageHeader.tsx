import React from 'react';

export default function PageHeader() {
    return (
        <svg
            id="producttree"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 3432 700"
            className="w-full h-auto"
        >
            {/* Background */}
            <rect width="3432" height="700" fill="#1C3559" />

            {/* Horizontal Lines */}
            <line x1="0" y1="100" x2="3432" y2="100" stroke="#ffffff" strokeWidth="8" />
            <line x1="0" y1="200" x2="3432" y2="200" stroke="#ffffff" strokeWidth="8" />
            <line x1="0" y1="300" x2="3432" y2="300" stroke="#204B87" strokeWidth="8" />
            <line x1="0" y1="400" x2="3432" y2="400" stroke="#204B87" strokeWidth="8" />

            {/* Logo and Vertical Line */}
            <g transform="translate(1716, 400)">
                <image
                    xlinkHref="/assets/logo.png"
                    x="-75"
                    y="-150"
                    width="150"
                    height="150"
                />
                <line x1="0" y1="0" x2="0" y2="300" stroke="#ffffff" strokeWidth="8" />
            </g>

            {/* Clouds */}
            <g>
                <circle cx="400" cy="150" r="80" fill="#ffffff" />
                <circle cx="600" cy="180" r="60" fill="#ffffff" />
                <circle cx="2800" cy="150" r="80" fill="#ffffff" />
                <circle cx="3000" cy="180" r="60" fill="#ffffff" />
            </g>
        </svg>
    );
}
