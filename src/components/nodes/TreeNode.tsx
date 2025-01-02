// src/components/nodes/TreeNode.tsx
import React, { useEffect, useState } from 'react';
import { TreeNode } from '../../types/tree';

interface TreeNodeComponentProps {
    node: TreeNode;
    position: { x: number; y: number };
}

export function TreeNodeComponent({ node, position }: TreeNodeComponentProps) {
    const [iconClass, setIconClass] = useState('');

    useEffect(() => {
        if (node.icon) {
            // Extract icon name from Font Awesome URL
            const match = node.icon.match(/icons\/([^?]+)/);
            if (match) {
                const iconName = match[1];
                setIconClass(`fa-${iconName}`);
            }
        }
    }, [node.icon]);

    return (
        <g transform={`translate(${position.x},${position.y})`}>
            <circle
                r="40"
                fill="#204B87"
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:scale-105 transition-transform"
            />
            {iconClass && (
                <text
                    x="-12"
                    y="0"
                    fill="white"
                    className={`text-lg fa ${iconClass}`}
                    dominantBaseline="middle"
                    textAnchor="middle"
                />
            )}
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