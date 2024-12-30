import React from 'react';
import AITree from './components/layout/AITree';
import { treeData } from './data/treeData';

export default function App() {
  return (
      <div className="w-screen min-h-screen relative" style={{ backgroundColor: '#1C3559' }}>
        {/* Header */}
        <div className="relative z-10 px-8 pt-16 pb-24">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-6xl text-white mb-6" style={{ fontFamily: 'Karla, sans-serif' }}>
              AI Capability Tree
            </h1>
            <div className="flex items-center space-x-4 mb-8">
              <div className="h-px w-12 bg-white"/>
              <p className="text-xl text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Roadmap for AI implementation
              </p>
            </div>
          </div>

          {/* Connecting element to tree */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <div className="h-16 w-px bg-gradient-to-b from-white to-transparent"/>
          </div>
        </div>

        {/* Tree Component */}
        <AITree data={treeData} />
      </div>
  );
}