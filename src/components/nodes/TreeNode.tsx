// src/components/nodes/TreeNode.tsx
import React from 'react';
import { TreeNode } from '../../types/tree';

interface TreeNodeComponentProps {
    node: TreeNode;
    position: { x: number; y: number };
}

export function TreeNodeComponent({ node, position }: TreeNodeComponentProps) {
    const getIconName = (iconUrl: string) => {
        try {
            const match = iconUrl.match(/icons\/([^/?]+)/);
            return match ? match[1] : '';
        } catch (e) {
            return '';
        }
    };

    const iconName = getIconName(node.icon);

    return (
        <g transform={`translate(${position.x},${position.y})`}>
            {/* Background circle */}
            <circle
                r="40"
                fill="#204B87"
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:scale-105 transition-transform"
            />

            {/* Icon container using foreignObject for better centering */}
            <foreignObject
                x="-25"
                y="-25"
                width="50"
                height="50"
                style={{
                    overflow: 'visible',
                    pointerEvents: 'none'
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}
                >
                    <i
                        className={`fas fa-${iconName} text-xl`}
                        style={{
                            color: 'white',
                            fontSize: '20px'
                        }}
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