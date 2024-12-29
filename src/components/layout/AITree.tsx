// src/components/layout/AITree.tsx
const AITree = () => {
  return (
    <div className="relative w-full h-screen">
      <svg 
        width="100%" 
        height="100%" 
        viewBox="-500 -500 2000 2000" // Adjust viewBox to center content better
        className="bg-gray-50"
      >
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15"/>
          </filter>
        </defs>

        {/* Foundation Node */}
        <g transform="translate(500, 200)"> {/* Adjust position */}
          <circle 
            r="60"
            fill="#4338ca"
            filter="url(#shadow)"
          />
          
          {/* Text positioned with better spacing */}
          <g transform="translate(80, 0)">
            <text 
              className="text-xl font-bold"
              fill="#1a2b4b"
              dominantBaseline="middle"
            >
              FOUNDATION
            </text>
            <text 
              y="25" 
              className="text-sm"
              fill="#64748b"
              dominantBaseline="middle"
            >
              Core AI governance and controls
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};