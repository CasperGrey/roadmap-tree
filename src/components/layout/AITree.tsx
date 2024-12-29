import React, { useState } from 'react';
import TreeNode from '../nodes/TreeNode';
import TreeConnector from '../connectors/TreeConnector';
import { NodeData } from '../../types/tree';

const initialTreeData: NodeData = {
  title: "FOUNDATION",
  description: "Core AI governance and controls",
  x: 1000,
  y: 500,
  children: [
    {
      title: "POLICY & GOVERNANCE",
      description: "Risk framework",
      x: 700,
      y: 700,
      color: '#3b82f6'
    },
    {
      title: "SECURITY CONTROLS",
      description: "MS Purview implementation",
      x: 1300,
      y: 700,
      color: '#3b82f6'
    }
  ]
};

const AITree: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [isAnimated, setIsAnimated] = useState(true);

  const renderNode = (node: NodeData, index: number) => {
    const nodeId = `${node.title}-${index}`;
    
    return (
      <React.Fragment key={nodeId}>
        {node.children?.map((child, childIndex) => (
          <React.Fragment key={`${nodeId}-conn-${childIndex}`}>
            <TreeConnector
              startX={node.x}
              startY={node.y}
              endX={child.x}
              endY={child.y}
              animated={isAnimated}
            />
            {renderNode(child, childIndex)}
          </React.Fragment>
        ))}
        <TreeNode
          {...node}
          isActive={activeNode === nodeId}
          isAnimated={isAnimated}
          onClick={() => setActiveNode(nodeId)}
        />
      </React.Fragment>
    );
  };

  return (
    <div className="relative w-full h-full">
      <svg 
        width="100%" 
        height="900"
        viewBox="0 0 2000 1000"
        className="bg-gray-50"
      >
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15"/>
          </filter>
        </defs>
        {renderNode(initialTreeData, 0)}
      </svg>
    </div>
  );
};

export default AITree;