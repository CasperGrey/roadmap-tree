// src/components/connectors/TreeConnector.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Position, NodeType } from '../../types/tree';

interface TreeConnectorProps {
    start: Position;
    end: Position;
    nodeType: NodeType;
    startRadius?: number;
    endRadius?: number;
}

export function TreeConnector({
                                  start,
                                  end,
                                  nodeType,
                                  startRadius = 45,
                                  endRadius = 40
                              }: TreeConnectorProps) {
    // Define node-specific radii
    const getNodeRadius = (type: NodeType) => {
        switch(type) {
            case 'parent': return 45;
            case 'sub': return 40;
            case 'sub2': return 35;
            default: return 40;
        }
    };

    const actualStartRadius = getNodeRadius(nodeType === 'sub2' ? 'sub' : 'parent');
    const actualEndRadius = getNodeRadius(nodeType);

    let startX, startY, endX, endY;

    if (nodeType === 'sub2') {
        startX = start.x + actualStartRadius; // Right side of parent
        startY = start.y;
        endX = end.x - actualEndRadius;      // Left side of sub2
        endY = end.y;

        console.log('Sub2 Connector:', {
            nodeType,
            start: { x: startX, y: startY },
            end: { x: endX, y: endY },
            radii: { start: actualStartRadius, end: actualEndRadius }
        });

        return (
            <>
                {/* Debug elements */}
                <circle cx={startX} cy={startY} r="3" fill="red" />
                <circle cx={endX} cy={endY} r="3" fill="green" />
                <line
                    x1={startX} y1={startY}
                    x2={endX} y2={endY}
                    stroke="yellow"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                />

                {/* Actual connector */}
                <motion.path
                    d={`M ${startX} ${startY} 
                        Q ${startX + (endX - startX) / 2} ${startY},
                          ${startX + (endX - startX) / 2} ${endY},
                          ${endX} ${endY}`}
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </>
        );
    } else {
        startX = start.x;
        startY = start.y + actualStartRadius; // Bottom of parent
        endX = end.x;
        endY = end.y - actualEndRadius;      // Top of child

        console.log('Sub Connector:', {
            nodeType,
            start: { x: startX, y: startY },
            end: { x: endX, y: endY },
            radii: { start: actualStartRadius, end: actualEndRadius }
        });

        return (
            <>
                {/* Debug elements */}
                <circle cx={startX} cy={startY} r="3" fill="red" />
                <circle cx={endX} cy={endY} r="3" fill="green" />
                <line
                    x1={startX} y1={startY}
                    x2={endX} y2={endY}
                    stroke="yellow"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                />

                {/* Actual connector */}
                <motion.path
                    d={`M ${startX} ${startY} 
                        L ${startX} ${startY + ((endY - startY) / 3)}
                        L ${endX} ${endY - ((endY - startY) / 3)}
                        L ${endX} ${endY}`}
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </>
        );
    }
}