// src/components/nodes/TreeNode.tsx
import React from 'react';
import { TreeNode } from '../../types/tree';

interface TreeNodeComponentProps {
    node: TreeNode;
    position: { x: number; y: number };
}

export function TreeNodeComponent({ node, position }: TreeNodeComponentProps) {
    const getIconName = (iconUrl: string) => {
        // Example URL: https://fontawesome.com/icons/vials?f=classic&s=solid
        const match = iconUrl.match(/icons\/([^?]+)/);
        if (match) {
            return match[1]; // Returns "vials" from the example URL
        }
        return '';
    };

    const renderIcon = () => {
        if (!node.icon) return null;

        const iconName = getIconName(node.icon);
        if (!iconName) return null;

        return (
            <>
                <foreignObject
                    x="-20"
                    y="-20"
                    width="40"
                    height="40"
                >
                    <div className="w-full h-full flex items-center justify-center">
                        <i className={`fas fa-${iconName} text-white text-xl`} />
                    </div>
                </foreignObject>
            </>
        );
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
            {renderIcon()}
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