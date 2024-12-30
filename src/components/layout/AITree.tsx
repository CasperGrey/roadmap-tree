import React from 'react';
import { TreeNode } from '../../data/treeData';

interface AITreeProps {
    data: TreeNode;
}

export default function AITree({ data }: AITreeProps) {
    const renderNode = (node: TreeNode, x: number, y: number) => {
        const isParent = node.type === 'parent';
        const isSub = node.type === 'sub';

        return (
            <g key={node.id}>
                {/* Node Circle */}
                <circle
                    cx={x}
                    cy={y}
                    r="40"
                    fill="#204B87"
                    stroke="white"
                    strokeWidth="2"
                    className="cursor-pointer hover:scale-105 transition-transform"
                />

                {/* Icon */}
                <svg x={x-20} y={y-20} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white">
                    <path d={node.icon} strokeWidth="2" />
                </svg>

                {/* Title */}
                {isParent ? (
                    <text
                        x={x + 60}
                        y={y}
                        fill="white"
                        className="font-karla text-xl"
                        dominantBaseline="middle"
                    >
                        {node.title}
                    </text>
                ) : (
                    <text
                        x={x}
                        y={y + 60}
                        fill="white"
                        className="font-poppins text-base text-center"
                        textAnchor="middle"
                    >
                        {node.title}
                    </text>
                )}

                {/* Render children */}
                {node.children?.map((child, index) => {
                    let childX = x;
                    let childY = y;

                    if (child.type === 'sub') {
                        childY += 200;  // Vertical spacing for sub nodes
                    } else if (child.type === 'sub2') {
                        childX += 150;  // Diagonal spacing for sub2 nodes
                        childY += 150;
                    }

                    return (
                        <g key={child.id}>
                            <line
                                x1={x}
                                y1={y}
                                x2={childX}
                                y2={childY}
                                stroke="white"
                                strokeWidth="2"
                            />
                            {renderNode(child, childX, childY)}
                        </g>
                    );
                })}
            </g>
        );
    };

    return (
        <div className="bg-bg-dark w-full min-h-screen">
            <div className="absolute inset-0 overflow-hidden">
                {/* Background wave pattern */}
                <svg width="100%" height="100%" className="opacity-10">
                    <path
                        d="M-100,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 V300 H-100 Z"
                        fill="white"
                    />
                </svg>
            </div>

            <svg width="100%" height="900" viewBox="-500 0 2000 1000">
                {renderNode(data, 500, 100)}
            </svg>
        </div>
    );
}