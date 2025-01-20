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
                return `M ${start.x} ${start.y + startRadius} 
                        L ${start.x} ${end.y - endRadius}`;

            case 'sequential':
                const midY = (start.y + end.y) / 2;
                return `M ${start.x} ${start.y + startRadius}
                        L ${start.x} ${midY}
                        L ${end.x} ${midY}
                        L ${end.x} ${end.y - endRadius}`;

            case 'sub2':
                const curveY = end.y - 50;
                return `M ${start.x} ${start.y + startRadius}
                        C ${start.x} ${curveY},
                          ${end.x} ${curveY},
                          ${end.x} ${end.y - endRadius}`;

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
            className="transition-all duration-300"
        />
    );
}