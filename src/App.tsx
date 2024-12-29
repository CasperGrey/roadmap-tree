// src/App.tsx
import React from 'react';
import AITree from './components/layout/AITree';

export default function App() {
  return (
    <div className="w-screen min-h-screen bg-[#121212]">
      {/* Hero Header Section */}
      <div className="relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 w-full h-64">
            {/* Decorative lines */}
            <svg width="100%" height="100%" viewBox="0 0 1000 200" className="opacity-10">
              <path 
                d="M0,50 C250,0 750,0 1000,50 L1000,0 L0,0 Z" 
                fill="#003087" 
              />
              {/* Add more decorative SVG elements */}
            </svg>
          </div>
        </div>

        {/* Main header content */}
        <div className="relative z-10 px-8 pt-16 pb-24">
          <div className="max-w-7xl mx-auto">
            {/* Logo or icon */}
            <div className="mb-8">
              <svg width="60" height="60" viewBox="0 0 60 60" className="text-ract-blue">
                {/* Add your logo SVG here */}
                <circle cx="30" cy="30" r="25" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M20,30 L40,30 M30,20 L30,40" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>

            {/* Title and description */}
            <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
              AI Capability Tree
            </h1>
            <div className="flex items-center space-x-4 mb-8">
              <div className="h-px w-12 bg-ract-blue"/>
              <p className="text-xl text-gray-400">
                Roadmap for AI implementation
              </p>
            </div>

            {/* Optional metadata or additional info */}
            <div className="flex space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-ract-blue mr-2"/>
                <span>Version 1.0</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-ract-blue mr-2"/>
                <span>Last updated: December 2024</span>
              </div>
            </div>
          </div>

          {/* Connecting element to tree */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <div className="h-16 w-px bg-gradient-to-b from-ract-blue to-transparent"/>
          </div>
        </div>
      </div>

      {/* Tree Component */}
      <AITree />
    </div>
  );
}