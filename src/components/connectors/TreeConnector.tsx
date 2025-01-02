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
                                  startRadius = 40,
                                  endRadius = 40
                              }: TreeConnectorProps) {
    // Calculate angle and points
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    const startX = start.x + Math.cos(angle) * startRadius;
    const startY = start.y + Math.sin(angle) * startRadius;
    const endX = end.x - Math.cos(angle) * endRadius;
    const endY = end.y - Math.sin(angle) * endRadius;

    // For sub2 nodes, use a diagonal line
    // For sub nodes, use a path with vertical and horizontal segments
    const path = nodeType === 'sub2'
        ? `M ${startX} ${startY} L ${endX} ${endY}`
        : `M ${startX} ${startY} 
           L ${startX} ${endY} 
           L ${endX} ${endY}`;

    return (
        <motion.path
            d={path}
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        />
    );
}