// src/components/nodes/TreeNode.tsx
import React from 'react';
import { TreeNode } from '../../types/tree';

interface TreeNodeComponentProps {
    node: TreeNode;
    position: { x: number; y: number };
}

export function TreeNodeComponent({ node, position }: TreeNodeComponentProps) {
    const getIconName = (iconUrl: string) => {
        const match = iconUrl.match(/icons\/([^?]+)/);
        return match ? match[1] : '';
    };

    return (
        <g transform={`translate(${position.x},${position.y})`}>
            <circle
                r="40"
                fill="#204B87"
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:scale-105 transition-transform"
            />

            {/* Icon container */}
            <foreignObject
                x="-20"
                y="-20"
                width="40"
                height="40"
                className="overflow-visible"
            >
                <div className="w-full h-full flex items-center justify-center">
                    <i
                        className={`fas fa-${getIconName(node.icon)} text-white text-xl`}
                        style={{ textAlign: 'center' }}
                    />
                </div>
            </foreignObject>

            {/* Node title */}
            <text
                x="60"
                y="0"
                fill="white"
                className="text-sm"
                dominantBaseline="middle"
            >
                {node.title}
            </text>
        </g>
    );
}