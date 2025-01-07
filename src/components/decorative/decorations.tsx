// src/components/decorative/Decorations.tsx
import React from 'react';
import { Lines } from './Shapes';

export function Decorations() {
    return (
        <g className="decorative-elements">
            {/* Clouds */}
            <g className="clouds">
                <path
                    d="M50,40 a20,20 0 0,1 40,0 a15,15 0 0,1 30,0"
                    fill="none"
                    stroke="#204B87"
                    strokeWidth="2"
                    opacity="0.4"
                />
                <path
                    d="M400,60 a25,25 0 0,1 50,0 a20,20 0 0,1 40,0"
                    fill="none"
                    stroke="#204B87"
                    strokeWidth="2"
                    opacity="0.4"
                />
                <path
                    d="M1800,50 a22,22 0 0,1 44,0 a18,18 0 0,1 36,0"
                    fill="none"
                    stroke="#204B87"
                    strokeWidth="2"
                    opacity="0.4"
                />
            </g>

            {/* Car icon */}
            <g transform="translate(1600, 40)">
                <foreignObject width="40" height="40">
                    <div className="w-full h-full flex items-center justify-center text-[#204B87] opacity-40">
                        <i className="fas fa-car text-2xl"></i>
                    </div>
                </foreignObject>
            </g>

            {/* RACT Logo */}
            <g transform="translate(1000, 40)">
                <rect
                    x="-30"
                    y="-30"
                    width="60"
                    height="60"
                    fill="#204B87"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    rx="4"
                />
                <text
                    x="0"
                    y="0"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    className="text-lg font-bold"
                >
                    RACT
                </text>
            </g>

            {/* Horizontal lines - using existing Lines component style */}
            <g transform="translate(0, 120)">
                <foreignObject width="2241.46" height="20">
                    <Lines />
                </foreignObject>
            </g>
        </g>
    );
}