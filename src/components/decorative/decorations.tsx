// src/components/decorative/Decorations.tsx
import React from 'react';


export function Decorations() {
    return (
        <g className="decorative-elements">
            {/* RACT Logo */}
            <g transform="translate(1120.73, 120)">
                <foreignObject
                    x="-40"
                    y="-40"
                    width="80"
                    height="80"
                >
                    <img
                        src="/Images/ract-logo.png"
                        alt="RACT Logo"
                        className="w-full h-full"
                    />
                </foreignObject>
            </g>

            {/* Horizontal lines */}
            <g transform="translate(0, 180)">
                <line
                    x1="0"
                    y1="0"
                    x2="2241.46"
                    y2="0"
                    stroke="#204B87"
                    strokeWidth="2"
                />
                <line
                    x1="0"
                    y1="5"
                    x2="2241.46"
                    y2="5"
                    stroke="#204B87"
                    strokeWidth="2"
                />
                <line
                    x1="0"
                    y1="10"
                    x2="2241.46"
                    y2="10"
                    stroke="#204B87"
                    strokeWidth="2"
                />
            </g>

            {/* Connecting line from logo to tree */}
            <line
                x1="1120.73"
                y1="160"
                x2="1120.73"
                y2="200"
                stroke="white"
                strokeWidth="2"
            />
        </g>
    );
}