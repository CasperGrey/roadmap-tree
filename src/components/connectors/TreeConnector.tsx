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
    if (nodeType === 'sub2') {
        // For sub2 nodes, create a curved connection from the right side
        const startX = start.x + startRadius;  // Start from right side of parent
        const startY = start.y;
        const endX = end.x - endRadius;        // Connect to left side of child
        const endY = end.y;

        // Calculate control points for the curve
        const midX = startX + (endX - startX) / 2;

        return (
            <motion.path
                d={`M ${startX} ${startY} 
                    C ${midX} ${startY}, 
                      ${midX} ${endY}, 
                      ${endX} ${endY}`}
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
        );
    }

    // For sub nodes, create a path that avoids other nodes
    const startX = start.x;
    const startY = start.y + startRadius;     // Start from bottom of parent
    const endX = end.x;
    const endY = end.y - endRadius;          // Connect to top of child
    const midY = startY + (endY - startY) / 2;

    return (
        <motion.path
            d={`M ${startX} ${startY} 
                L ${startX} ${midY} 
                L ${endX} ${midY} 
                L ${endX} ${endY}`}
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        />
    );
}