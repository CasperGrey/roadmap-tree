// src/components/nodes/TreeNode.tsx
import React from 'react';
import { TreeNode } from '../../types/tree';

interface TreeNodeComponentProps {
    node: TreeNode;
    position: { x: number; y: number };
}

export function TreeNodeComponent({ node, position }: TreeNodeComponentProps) {
    const getNodeStyles = (type: 'parent' | 'sub' | 'sub2') => {
        const styles = {
            parent: {
                radius: 45,
                fill: '#204B87',
                titleOffset: 70,
                titleClass: 'text-lg font-medium'
            },
            sub: {
                radius: 40,
                fill: '#204B87',
                titleOffset: 60,
                titleClass: 'text-xs font-normal'
            },
            sub2: {
                radius: 35,
                fill: '#204B87',
                titleOffset: 55,
                titleClass: 'text-xs font-normal'
            }
        };

        const style = styles[type];
        return {
            ...style,
            iconSize: style.radius * 0.75 // 75% of node radius
        };
    };

    const style = getNodeStyles(node.type);
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
                <svg x={-style.iconSize/2} y={-style.iconSize/2} width={style.iconSize} height={style.iconSize}>
                    <image
                        href={node.icon}
                        width="100%"
                        height="100%"
                        filter="brightness(0) invert(1)"  // Makes the icon white
                        preserveAspectRatio="xMidYMid meet"
                    />
                </svg>
            ) : (
                <foreignObject
                    x={-style.iconSize/2}
                    y={-style.iconSize/2}
                    width={style.iconSize}
                    height={style.iconSize}
                >
                    <div className="w-full h-full flex items-center justify-center text-white">
                        <i className={`fas fa-${node.icon}`} style={{ fontSize: style.iconSize * 0.6 }} />
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