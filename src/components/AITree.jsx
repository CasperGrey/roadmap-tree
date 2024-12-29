import React from 'react';
import TreeNode from './TreeNode';
import TreeConnector from './TreeConnector';

const AITree = () => {
  const treeData = {
    foundation: {
      title: "FOUNDATION",
      description: "Core AI governance and controls",
      x: 2000,
      y: 1000,
      children: [
        {
          title: "POLICY & GOVERNANCE",
          description: "Risk framework",
          x: 1500,  // Increased horizontal spacing
          y: 1500,  // Increased vertical spacing
        },
        {
          title: "SECURITY CONTROLS",
          description: "MS Purview implementation",
          x: 2500,
          y: 1500,
        }
      ]
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-white">
      <svg 
        width="100%" 
        height="100%" 
        viewBox="1000 500 2000 2000"
        style={{
          background: 'linear-gradient(to bottom, #f8fafc, #ffffff)'
        }}
      >
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow 
              dx="0" 
              dy="4" 
              stdDeviation="8" 
              floodColor="#000000" 
              floodOpacity="0.08" 
            />
          </filter>
        </defs>

        <g>
          {/* Background grid for debugging (can be removed later) */}
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#f1f5f9" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Connectors */}
          {treeData.foundation.children.map((child, index) => (
            <TreeConnector
              key={`connector-${index}`}
              start={{
                x: treeData.foundation.x,
                y: treeData.foundation.y
              }}
              end={{
                x: child.x,
                y: child.y
              }}
            />
          ))}

          {/* Nodes */}
          <TreeNode
            title={treeData.foundation.title}
            description={treeData.foundation.description}
            x={treeData.foundation.x}
            y={treeData.foundation.y}
          />

          {treeData.foundation.children.map((child, index) => (
            <TreeNode
              key={`node-${index}`}
              title={child.title}
              description={child.description}
              x={child.x}
              y={child.y}
              color="productivity"
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default AITree;