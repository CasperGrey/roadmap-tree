// src/components/connectors/TreeConnector.tsx
import React from 'react';
import { motion } from 'framer-motion';
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
                                  startRadius: propStartRadius,
                                  endRadius: propEndRadius
                              }: TreeConnectorProps) {
    if (!start || !end) {
        console.error('Missing required props:', { start, end });
        return null;
    }

    // Define node-specific radii
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

    // Sub2 connections (diagonal)
    if (connectionType === 'sub2') {
        const startX = start.x + startRadius;  // Start from right side of parent
        const startY = start.y;
        const endX = end.x - endRadius;        // Connect to left side of child
        const endY = end.y;
        const controlX = startX + (endX - startX) / 2;

        return (
            <motion.path
                d={`M ${startX} ${startY} 
                    C ${controlX} ${startY},
                    ${controlX} ${endY},
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

    // Sequential connections (between sub nodes)
    if (connectionType === 'sequential') {
        const startX = start.x;
        const startY = start.y + startRadius + 5;  // Start below the first node
        const endX = start.x;                      // Keep same X coordinate for vertical line
        const midY = startY + ((end.y - startY) * 0.5);  // Midpoint for vertical connection

        return (
            <motion.path
                d={`M ${startX} ${startY} 
                    L ${startX} ${midY} 
                    L ${startX} ${end.y - endRadius - 5}`}  // End above the next node
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
        );
    }

    // Vertical connections (parent to first sub)
    const startX = start.x;
    const startY = start.y + startRadius + 5;  // Start below parent
    const endX = end.x;
    const endY = end.y - endRadius - 5;        // End above child

    return (
        <motion.path
            d={`M ${startX} ${startY} 
                L ${startX} ${(startY + endY) / 2}
                L ${endX} ${(startY + endY) / 2}
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