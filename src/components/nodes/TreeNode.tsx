import React, { useState } from 'react';
import { TreeNode } from '../../types/tree';

interface TreeNodeComponentProps {
    node: TreeNode;
    position: { x: number; y: number };
    onNodeClick: (node: TreeNode) => void;
}

export function TreeNodeComponent({
                                      node,
                                      position,
                                      onNodeClick
                                  }: TreeNodeComponentProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

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

        return {
            ...styles[type],
            iconSize: styles[type].radius * 0.75
        };
    };

    const toTitleCase = (str: string) => {
        const UPPERCASE_WORDS = ['AI', 'PR', 'MS', 'LMS', 'POC'];
        return str.split(' ').map(word => {
            if (UPPERCASE_WORDS.includes(word.toUpperCase())) {
                return word.toUpperCase();
            }
            if (word === '&') return '&';
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onNodeClick(node);
    };

    const style = getNodeStyles(node.type);
    const isImageUrl = (icon: string) => icon.startsWith('http') || icon.startsWith('/') || icon.startsWith('./');

    return (
        <g transform={`translate(${position.x},${position.y})`}>
            <circle
                r={style.radius}
                fill={style.fill}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={handleClick}
            />

            {isImageUrl(node.icon) ? (
                <>
                    {!imageLoaded && !imageError && (
                        <circle
                            r={style.radius}
                            fill="#204B87"
                            className="animate-pulse"
                        />
                    )}
                    <svg x={-style.iconSize/2} y={-style.iconSize/2} width={style.iconSize} height={style.iconSize}>
                        <image
                            href={node.icon}
                            width="100%"
                            height="100%"
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageError(true)}
                            style={{ opacity: imageLoaded ? 1 : 0 }}
                            filter="brightness(0) invert(1)"
                            preserveAspectRatio="xMidYMid meet"
                        />
                    </svg>
                </>
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

            <text
                x={style.titleOffset}
                y="0"
                fill="white"
                className={`${style.titleClass}`}
                dominantBaseline="middle"
            >
                {toTitleCase(node.title)}
            </text>
        </g>
    );
}