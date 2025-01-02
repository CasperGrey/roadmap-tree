// src/components/connectors/TreeConnector.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { TreeConnectorProps } from '../../types/tree';

export function TreeConnector({
                                  start,
                                  end,
                                  startRadius = 40,
                                  endRadius = 40
                              }: TreeConnectorProps) {
    // Calculate the angle between the points
    const angle = Math.atan2(end.y - start.y, end.x - start.x);

    // Calculate start point (outside of start circle)
    const startX = start.x + Math.cos(angle) * startRadius;
    const startY = start.y + Math.sin(angle) * startRadius;

    // Calculate end point (outside of end circle)
    const endX = end.x - Math.cos(angle) * endRadius;
    const endY = end.y - Math.sin(angle) * endRadius;

    // Create the path
    const path = `M ${startX} ${startY} L ${endX} ${endY}`;

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