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
                                  endRadius = 35
                              }: TreeConnectorProps) {
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    const startX = start.x;
    const startY = start.y;
    const endX = end.x;
    const endY = end.y;

    // For sub2 nodes, create a diagonal line with a curve
    if (nodeType === 'sub2') {
        const controlX = (startX + endX) / 2;
        const controlY = (startY + endY) / 2;
        return (
            <motion.path
                d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`}
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
        );
    }

    // For sub nodes, create a straight vertical line
    const path = `M ${startX} ${startY} L ${startX} ${endY} L ${endX} ${endY}`;

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