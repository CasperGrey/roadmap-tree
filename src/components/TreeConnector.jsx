import React from 'react';
import { motion } from 'framer-motion';

const TreeConnector = ({ start, end }) => {
  return (
    <motion.line
      x1={start.x}
      y1={start.y}
      x2={end.x}
      y2={end.y}
      stroke="#E2E8F0"
      strokeWidth="2"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
};

export default TreeConnector;