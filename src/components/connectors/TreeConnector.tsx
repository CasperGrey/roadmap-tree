import React from 'react';
import { Position, NodeType } from '../../types/tree';

interface TreeConnectorProps {
    start: Position;
    end: Position;
    nodeType: NodeType;
    connectionType: 'vertical' | 'sequential' | 'sub2';
    startRadius?: number;
    endRadius?: number;
}

export function TreeConnector({
                                  start,
                                  end,
                                  nodeType,
                                  connectionType,
                                  startRadius = 45,
                                  endRadius = 40
                              }: TreeConnectorProps) {
    const getPath = () => {
        switch (connectionType) {
            case 'vertical':
                // Straight vertical line from bottom center of parent to top center of sub
                return `M ${start.x} ${start.y + startRadius} 
                        L ${start.x} ${end.y - endRadius}`;

            case 'sequential':
                // Vertical connection between sub nodes with horizontal offset if needed
                const midY = (start.y + end.y) / 2;
                return `M ${start.x} ${start.y + startRadius}
                        L ${start.x} ${midY}
                        L ${end.x} ${midY}
                        L ${end.x} ${end.y - endRadius}`;

            case 'sub2':
                // Curved diagonal connection from right side of sub to left side of sub2
                const startX = start.x + startRadius; // Start from right side
                const endX = end.x - endRadius; // End at left side
                const curveY = end.y - 50;
                return `M ${startX} ${start.y}
                        C ${startX + 50} ${start.y},
                          ${endX - 50} ${end.y},
                          ${endX} ${end.y}`;

            default:
                return '';
        }
    };

    return (
        <path
            d={getPath()}
            stroke="white"
            strokeWidth="2"
            fill="none"
        />
    );
}