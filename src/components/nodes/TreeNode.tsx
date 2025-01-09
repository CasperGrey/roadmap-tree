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
    const isImageUrl = (icon: string) => icon.startsWith('http') || icon.startsWith('/') || icon.startsWith('./');

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
            {isImageUrl(node.icon) ? (
                <svg x={-style.radius/2} y={-style.radius/2} width={style.radius} height={style.radius}>
                    <image
                        href={node.icon}
                        width="100%"
                        height="100%"
                        preserveAspectRatio="xMidYMid meet"
                    />
                </svg>
            ) : (
                <foreignObject
                    x={-style.radius/2}
                    y={-style.radius/2}
                    width={style.radius}
                    height={style.radius}
                >
                    <div className="w-full h-full flex items-center justify-center text-white">
                        <i className={`fas fa-${node.icon} ${style.iconSize}`} />
                    </div>
                </foreignObject>
            )}

            {/* Title */}
            <text
                x={style.titleOffset}
                y="0"
                fill="white"
                className={`${style.titleClass}`}
                dominantBaseline="middle"
            >
                {node.title}
            </text>
        </g>
    );
}