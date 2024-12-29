import React from 'react';
import TreeNode from './TreeNode';
import TreeConnector from './TreeConnector';

const AITree = () => {
  const treeData = {
    foundation: {
      title: "FOUNDATION",
      description: "Core AI governance and controls",
      x: 400,
      y: 100,
      children: [
        {
          title: "POLICY & GOVERNANCE",
          description: "Risk framework",
          x: 200,
          y: 300,
        },
        {
          title: "SECURITY CONTROLS",
          description: "MS Purview implementation",
          x: 600,
          y: 300,
        }
      ]
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 1200 800"  // Wider viewBox
        className="bg-gray-50"
      >
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.15" />
          </filter>
        </defs>
        
        {/* Rest of the tree content */}
      </svg>
    </div>
  );
};

export default AITree;