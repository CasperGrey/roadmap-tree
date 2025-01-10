// src/components/nodes/TreeNode.tsx
import React from 'react';
import { TreeNode } from '../../types/tree';

interface TreeNodeComponentProps {
    node: TreeNode;
    position: { x: number; y: number };
    onNodeClick?: (node: TreeNode) => void;
}

export function TreeNodeComponent({
                                      node,
                                      position,
                                      onNodeClick
                                  }: TreeNodeComponentProps) {
    const handleClick = () => {
        console.log('Node clicked:', node.id);
        onNodeClick?.(node);
    };

    const getNodeStyles = (type: 'parent' | 'sub' | 'sub2') => {
        const styles = {
            parent: {
                radius: 45,
                fill: '#204B87',
                titleOffset: 70,
                titleClass: 'text-lg font-medium uppercase'
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

        return {
            ...styles[type],
            iconSize: styles[type].radius * 0.75
        };
    };

    const style = getNodeStyles(node.type);
    const isImageUrl = (icon: string) => icon.startsWith('http') || icon.startsWith('/') || icon.startsWith('./');

    return (
        <g transform={`translate(${position.x},${position.y})`}>
            {/* Background circle with click handler */}
            <circle
                r={style.radius}
                fill={style.fill}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={handleClick}
            />

            {/* Icon */}
            {isImageUrl(node.icon) ? (
                <svg x={-style.iconSize/2} y={-style.iconSize/2} width={style.iconSize} height={style.iconSize}>
                    <image
                        href={node.icon}
                        width="100%"
                        height="100%"
                        filter="brightness(0) invert(1)"
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