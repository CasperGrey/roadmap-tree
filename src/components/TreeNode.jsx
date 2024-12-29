import React from 'react';
import { motion } from 'framer-motion';

const TreeNode = ({ title, description, x, y, color = 'foundation' }) => {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transform={`translate(${x}, ${y})`}
      className="tree-node"
    >
      {/* Node circle */}
      <motion.circle
        r="40"
        className={`node-circle fill-${color}`}
        filter="url(#shadow)"  // We'll add this filter
      />
      
      {/* Text group with better positioning */}
      <g transform="translate(60, 0)">
        <text
          className="tree-node-title"
          dy="-0.5em"
        >
          {title}
        </text>
        {description && (
          <text
            className="tree-node-description"
            dy="1.5em"
          >
            {description}
          </text>
        )}
      </g>
    </motion.g>
  );
};

export default TreeNode;