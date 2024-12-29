// src/App.js
import React from 'react';

function App() {
  return (
    <div className="w-screen h-screen bg-gray-50">
      <div className="text-2xl p-4 font-bold text-blue-600">AI Capability Tree</div>
      
      {/* Simple test SVG */}
      <svg 
        width="100%" 
        height="500" 
        viewBox="0 0 1000 500"
      >
        {/* Test circle */}
        <circle 
          cx="500" 
          cy="250" 
          r="50" 
          fill="#4338ca"
        />
        
        {/* Test text */}
        <text 
          x="600" 
          y="250" 
          fill="#1a2b4b"
          className="text-xl"
        >
          Test Node
        </text>
      </svg>
    </div>
  );
}

export default App;