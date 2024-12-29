import React from 'react';
import { motion } from 'framer-motion';
import { TreeConnectorProps } from '../../types/tree';

const TreeConnector: React.FC<TreeConnectorProps> = ({
  startX,
  startY,
  endX,
  endY,
  animated = true
}) => {
  const LineComponent = animated ? motion.line : 'line';

  return (
    <LineComponent
      x1={startX}
      y1={startY}
      x2={endX}
      y2={endY}
      stroke="#e2e8f0"
      strokeWidth="3"
      strokeLinecap="round"
      initial={animated ? { pathLength: 0, opacity: 0 } : false}
      animate={animated ? { pathLength: 1, opacity: 1 } : false}
      transition={{ duration: 0.5 }}
    />
  );
};

export default TreeConnector;