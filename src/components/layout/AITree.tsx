// src/components/layout/AITree.tsx
import React from 'react';

export default function AITree() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-ract-light to-white">
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_40%,rgba(238,242,246,0.4)_60%)]" />
      
      <svg 
        width="100%" 
        height="100%" 
        viewBox="-500 -500 2000 2000"
        className="relative z-10"
      >
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15"/>
          </filter>
          
          {/* Gradient definitions */}
          <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#003087" />
            <stop offset="100%" stopColor="#1B365D" />
          </linearGradient>
        </defs>

        {/* Foundation Node */}
        <g transform="translate(500, 200)">
          <circle 
            r="60"
            fill="url(#nodeGradient)"
            filter="url(#shadow)"
            className="transition-transform duration-300 hover:scale-105"
          />
          
          <g transform="translate(80, 0)">
            <text 
              className="text-xl font-bold tracking-wide"
              fill="#1B365D"
              dominantBaseline="middle"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              FOUNDATION
            </text>
            <text 
              y="25" 
              className="text-sm"
              fill="#58595B"
              dominantBaseline="middle"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Core AI governance and controls
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}