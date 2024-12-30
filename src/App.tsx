  // src/App.tsx
import React from 'react';
import AITree from './components/layout/AITree';

export default function App() {
  return (
    <div className="w-screen min-h-screen bg-[#121212]">  {/* Dark background like Tree of Up */}
    <div className="relative overflow-hidden">
      {/* Decorative header section */}
      <div className="px-8 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            AI Capability Tree
          </h1>
          <p className="text-gray-400 text-xl">
            Roadmap for AI implementation
          </p>
        </div>
        
        {/* Decorative line connecting to tree */}
        <div className="absolute bottom-0 left-1/2 w-px h-24 bg-ract-blue opacity-50" />
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-64 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 1000 200">
          {/* Add some subtle background patterns like Tree of Up */}
          <path d="M0,100 Q250,0 500,100 T1000,100" stroke="#003087" fill="none" />
        </svg>
      </div>
    </div>
    <AITree />
  </div>
  );
}