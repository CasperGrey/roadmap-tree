import React from 'react';
import { motion } from 'framer-motion';

const TreeConnector = ({ start, end }) => {
  return (
    <motion.line
      x1={start.x}
      y1={start.y}
      x2={end.x}
      y2={end.y}
      stroke="#e2e8f0"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    />
  );
};

export default TreeConnector;