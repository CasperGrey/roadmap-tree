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
            titleOffset: 70,
            titleClass: 'text-sm font-normal'
        },
        sub: {
            radius: 40,
            fill: '#204B87',
            iconSize: 'text-xl',
            titleOffset: 60,
            titleClass: 'text-xs font-normal'
        },
        sub2: {
            radius: 35,
            fill: '#204B87',
            iconSize: 'text-lg',
            titleOffset: 55,
            titleClass: 'text-xs font-normal'
        }
    };

    const style = nodeStyles[node.type];

    return (
        <g transform={`translate(${position.x},${position.y})`}>
            {/* Background circle */}
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
                className="pointer-events-none"
            >
                <div
                    className={`w-full h-full flex items-center justify-center ${style.iconSize}`}
                    style={{
                        fontFamily: 'Poppins, sans-serif',
                        color: 'white'
                    }}
                >
                    <i className={`fas fa-${node.icon}`}></i>
                </div>
            </foreignObject>

            {/* Title */}
            <text
                x={style.titleOffset}
                y="0"
                fill="white"
                className={`${style.titleClass} font-poppins`}
                dominantBaseline="middle"
                style={{ fontFamily: 'Poppins, sans-serif' }}
            >
                {node.title}
            </text>
        </g>
    );
}