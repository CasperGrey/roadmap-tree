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
                                  startRadius: propStartRadius,
                                  endRadius: propEndRadius
                              }: TreeConnectorProps) {
    if (!start || !end) {
        console.error('Missing required props:', { start, end });
        return null;
    }

    // Define node-specific radii with explicit fallbacks
    const getNodeRadius = (type: NodeType): number => {
        switch(type) {
            case 'parent': return 45;
            case 'sub': return 40;
            case 'sub2': return 35;
            default: return 40;
        }
    };

    const startRadius = propStartRadius || getNodeRadius(nodeType === 'sub2' ? 'sub' : 'parent');
    const endRadius = propEndRadius || getNodeRadius(nodeType);

    // For sub2 nodes (diagonal connectors from parent node)
    if (nodeType === 'sub2') {
        const startX = start.x + startRadius;  // Start from right side of parent
        const startY = start.y;                // Center height
        const endX = end.x - endRadius;        // Connect to left side of child
        const endY = end.y;                    // Center height

        return (
            <>
                {/* Actual connector */}
                <motion.path
                    d={`M ${startX} ${startY} 
                        C ${startX + (endX - startX) / 2} ${startY},
                          ${startX + (endX - startX) / 2} ${endY},
                          ${endX} ${endY}`}
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {/* Debug visualization - comment out in production */}
                <circle cx={startX} cy={startY} r="3" fill="red" opacity="0.5" />
                <circle cx={endX} cy={endY} r="3" fill="green" opacity="0.5" />
            </>
        );
    }

    // For regular sub nodes (vertical connectors)
    const startX = start.x;
    const startY = start.y + startRadius;  // Start from bottom of parent
    const endX = end.x;
    const endY = end.y - endRadius;        // Connect to top of child

    return (
        <>
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

            {/* Debug visualization - comment out in production */}
            <circle cx={startX} cy={startY} r="3" fill="red" opacity="0.5" />
            <circle cx={endX} cy={endY} r="3" fill="green" opacity="0.5" />
        </>
    );
}