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
        viewBox="0 0 800 600"
        className="bg-gray-50"
      >
        <g>
          {/* Root node */}
          <TreeNode
            title={treeData.foundation.title}
            description={treeData.foundation.description}
            x={treeData.foundation.x}
            y={treeData.foundation.y}
          />

          {/* Child nodes */}
          {treeData.foundation.children.map((child, index) => (
            <React.Fragment key={index}>
              <TreeConnector
                start={{
                  x: treeData.foundation.x,
                  y: treeData.foundation.y
                }}
                end={{
                  x: child.x,
                  y: child.y
                }}
              />
              <TreeNode
                title={child.title}
                description={child.description}
                x={child.x}
                y={child.y}
                color="productivity"
              />
            </React.Fragment>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default AITree;