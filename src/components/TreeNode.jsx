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
      />
      
      {/* Text labels */}
      <g transform="translate(120, 0)">
        <text
          className="node-text"
          dominantBaseline="middle"
        >
          {title}
        </text>
        {description && (
          <text
            y="25"
            className="node-description"
            dominantBaseline="middle"
          >
            {description}
          </text>
        )}
      </g>
    </motion.g>
  );
};

export default TreeNode;