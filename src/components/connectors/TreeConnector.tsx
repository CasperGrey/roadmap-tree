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

    if (nodeType === 'sub2') {
        // Sub2 nodes connect from the right side of their parent sub node
        const startX = start.x + actualStartRadius; // Right side of parent
        const startY = start.y;
        const endX = end.x - actualEndRadius;      // Left side of sub2
        const endY = end.y;

        // Calculate curve control points
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
    } else {
        // Regular sub nodes connect from bottom to top
        const startX = start.x;
        const startY = start.y + actualStartRadius; // Bottom of parent
        const endX = end.x;
        const endY = end.y - actualEndRadius;      // Top of child

        return (
            <motion.path
                d={`M ${startX} ${startY} 
                    L ${startX} ${startY + 20}
                    L ${endX} ${endY - 20}
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
}