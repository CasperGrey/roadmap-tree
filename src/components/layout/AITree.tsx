import React from 'react';
import { TreeNode } from '../../data/treeData';

interface AITreeProps {
  data: TreeNode;
}

export default function AITree({ data }: AITreeProps) {
  const renderNode = (node: TreeNode, x: number, y: number, level: number) => {
    const childSpacing = 300;
    const verticalSpacing = 200;

    return (
        <g key={node.id}>
          {/* Node */}
          <circle
              cx={x}
              cy={y}
              r="40"
              fill="#204B87"
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer hover:scale-105 transition-transform"
          />

          {/* Text */}
          <text
              x={x}
              y={y}
              textAnchor="middle"
              fill="white"
              className="text-sm font-bold"
          >
            {node.title}
          </text>

          {/* Children */}
          {node.children?.map((child, index) => {
            const childX = x - ((node.children!.length - 1) * childSpacing / 2) + (index * childSpacing);
            const childY = y + verticalSpacing;

            return (
                <g key={child.id}>
                  {/* Straight connecting line */}
                  <line
                      x1={x}
                      y1={y + 40} // node radius
                      x2={childX}
                      y2={childY - 40} // node radius
                      stroke="white"
                      strokeWidth="2"
                  />
                  {renderNode(child, childX, childY, level + 1)}
                </g>
            );
          })}
        </g>
    );
  };

  return (
      <div className="bg-bg-dark w-full min-h-screen">
        <svg width="100%" height="900" viewBox="-500 0 2000 1000">
          {renderNode(data, 500, 100, 0)}
        </svg>
      </div>
  );
}