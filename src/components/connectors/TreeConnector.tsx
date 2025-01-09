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
    // Calculate connection points based on node type
    const startNodeRadius = nodeType === 'sub2' ? 40 : 45;  // Parent/Sub nodes are larger
    const endNodeRadius = nodeType === 'sub2' ? 35 : 40;    // Sub2 nodes are smaller

    // Calculate exact connection points
    const startX = start.x;
    const startY = start.y + startNodeRadius + 5;  // Add small offset for visual polish
    const endX = end.x;
    const endY = end.y - endNodeRadius - 5;  // Subtract small offset for visual polish

    // For sub2 nodes, create a curved path from right side of parent
    if (nodeType === 'sub2') {
        const startNodeRadius = 40;  // Parent/Sub nodes radius
        const endNodeRadius = 35;    // Sub2 nodes radius

        // Start from right side of parent node
        const startX = start.x + startNodeRadius;
        const startY = start.y;
        const endX = end.x - endNodeRadius;
        const endY = end.y;

        // Calculate control points for the curve
        const controlPoint1X = startX + (endX - startX) * 0.5;
        const controlPoint1Y = startY;
        const controlPoint2X = startX + (endX - startX) * 0.5;
        const controlPoint2Y = endY;

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