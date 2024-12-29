import React from 'react';
import { motion } from 'framer-motion';

const TreeNode = ({ title, description, x, y, color = 'foundation' }) => {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
      transform={`translate(${x}, ${y})`}
      className="tree-node"
    >
      {/* Node circle */}
      <motion.circle
        r="60"  // Tree of Up uses larger circles
        className={`node-circle fill-${color}`}
        filter="url(#shadow)"
        style={{
          filter: 'drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08))'
        }}
      />
      
      {/* Text group */}
      <g transform="translate(100, 0)">  // Increased offset from circle
        <text
          className="font-semibold uppercase tracking-wider"
          dy="-10"
          fill="#1a2b4b"
          style={{
            fontSize: '24px',
            fontFamily: 'Inter, system-ui, sans-serif'
          }}
        >
          {title}
        </text>
        {description && (
          <text
            className="font-normal"
            dy="20"
            fill="#64748b"
            style={{
              fontSize: '16px',
              fontFamily: 'Inter, system-ui, sans-serif'
            }}
          >
            {description}
          </text>
        )}
      </g>
    </motion.g>
  );
};

export default TreeNode;