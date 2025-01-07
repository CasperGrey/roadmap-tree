// src/components/decorative/Decorations.tsx
import React from 'react';

export function Decorations() {
    return (
        <g className="decorative-elements">
            {/* Pine Tree Logo */}
            <g transform="translate(1000, 40)">
                <circle
                    r="45"
                    fill="#204B87"
                    stroke="white"
                    strokeWidth="2"
                />
                <path
                    d="M0,-30 L15,0 L-15,0 Z"  // Simplified tree shape - adjust path for exact match
                    fill="white"
                    className="transform translate-y-[-5px]"
                />
                <path
                    d="M0,-15 L10,10 L-10,10 Z"
                    fill="white"
                    className="transform translate-y-[-5px]"
                />
            </g>

            {/* Mountains in background */}
            <g transform="translate(800, 100)">
                <path
                    d="M0,0 L30,-20 L60,0 L90,-30 L120,0"
                    stroke="#204B87"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.3"
                />
            </g>

            {/* Clouds */}
            <g>
                <path
                    d="M100,40 a20,20 0 0,1 40,0"
                    fill="none"
                    stroke="#204B87"
                    strokeWidth="2"
                    opacity="0.3"
                />
                <path
                    d="M1600,60 a25,25 0 0,1 50,0"
                    fill="none"
                    stroke="#204B87"
                    strokeWidth="2"
                    opacity="0.3"
                />
            </g>

            {/* Car icon */}
            <g transform="translate(1800, 60)">
                <rect
                    width="40"
                    height="30"
                    fill="none"
                    stroke="#204B87"
                    strokeWidth="2"
                    opacity="0.3"
                    rx="5"
                />
            </g>

            {/* Blue lines */}
            <g transform="translate(0, 120)">
                <line
                    x1="0"
                    y1="0"
                    x2="2241.46"
                    y2="0"
                    stroke="#204B87"
                    strokeWidth="2"
                    opacity="0.3"
                />
                <line
                    x1="0"
                    y1="5"
                    x2="2241.46"
                    y2="5"
                    stroke="#204B87"
                    strokeWidth="2"
                    opacity="0.3"
                />
                <line
                    x1="0"
                    y1="10"
                    x2="2241.46"
                    y2="10"
                    stroke="#204B87"
                    strokeWidth="2"
                    opacity="0.3"
                />
            </g>
        </g>
    );
}