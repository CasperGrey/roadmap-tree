// src/components/nodes/TreeNode.tsx
import React from 'react';
import { TreeNode } from '../../types/tree';

interface TreeNodeComponentProps {
    node: TreeNode;
    position: { x: number; y: number };
}

export function TreeNodeComponent({ node, position }: TreeNodeComponentProps) {
    const nodeStyles = {
        parent: {
            radius: 45,
            fill: '#204B87',
            iconSize: 'text-2xl',
            titleOffset: 70
        },
        sub: {
            radius: 40,
            fill: '#204B87',
            iconSize: 'text-xl',
            titleOffset: 60
        },
        sub2: {
            radius: 35,
            fill: '#204B87',
            iconSize: 'text-lg',
            titleOffset: 55
        }
    };

    const style = nodeStyles[node.type];

    return (
        <g transform={`translate(${position.x},${position.y})`}>
            <circle
                r={style.radius}
                fill={style.fill}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:scale-105 transition-transform"
            />

            {/* Icon */}
            <foreignObject
                x={-style.radius/2}
                y={-style.radius/2}
                width={style.radius}
                height={style.radius}
                style={{
                    overflow: 'visible',
                    pointerEvents: 'none'
                }}
            >
                <div
                    className={`w-full h-full flex items-center justify-center ${style.iconSize} text-white`}
                >
                    <i className={`fas fa-${node.icon}`}></i>
                </div>
            </foreignObject>

            {/* Title */}
            <text
                x={style.titleOffset}
                y="0"
                fill="white"
                className="text-sm font-medium"
                dominantBaseline="middle"
            >
                {node.title}
            </text>
        </g>
    );
}