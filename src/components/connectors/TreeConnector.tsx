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
    // Calculate start and end points adjusting for node radius
    const startX = start.x;
    const startY = start.y + startRadius; // Start from bottom of parent
    const endX = end.x;
    const endY = end.y - endRadius; // Connect to top of child

    // For sub2 nodes, create a curved path
    if (nodeType === 'sub2') {
        const controlPoint1X = startX;
        const controlPoint1Y = startY + (endY - startY) / 3;
        const controlPoint2X = endX;
        const controlPoint2Y = endY - (endY - startY) / 3;

        return (
            <motion.path
                d={`M ${startX} ${startY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${endX} ${endY}`}
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
        );
    }

    // For sub nodes, create a straight vertical line with a horizontal connection
    return (
        <motion.path
            d={`M ${startX} ${startY} L ${startX} ${(startY + endY) / 2} L ${endX} ${(startY + endY) / 2} L ${endX} ${endY}`}
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        />
    );
}