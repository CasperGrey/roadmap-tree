import React from 'react';
import { TreeNode } from '../../types/tree';

interface TreeNodeComponentProps {
  node: TreeNode;
  position: { x: number; y: number };
}

export function TreeNodeComponent({ node, position }: TreeNodeComponentProps) {
  return (
      <g transform={`translate(${position.x},${position.y})`}>
        <circle
            r="40"
            fill="#204B87"
            stroke="white"
            strokeWidth="2"
            className="cursor-pointer hover:scale-105 transition-transform"
        />
        <text
            x={60}
            y={0}
            fill="white"
            className="text-sm"
            dominantBaseline="middle"
        >
          {node.title}
        </text>
      </g>
  );
}