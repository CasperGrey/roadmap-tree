import React from 'react';
import { motion } from 'framer-motion';
import { TreeNodeProps } from '../../types/tree';

const TreeNode: React.FC<TreeNodeProps> = ({
  title,
  description,
  x,
  y,
  color = '#4338ca',
  onClick,
  isActive = false,
  isAnimated = true
}) => {
  const nodeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const CircleComponent = isAnimated ? motion.circle : 'circle';
  const GroupComponent = isAnimated ? motion.g : 'g';

  return (
    <GroupComponent
      transform={`translate(${x}, ${y})`}
      variants={isAnimated ? nodeVariants : undefined}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={onClick}
      className={`cursor-pointer ${isActive ? 'opacity-100' : 'opacity-80'}`}
    >
      <CircleComponent 
        r="60"
        fill={color}
        filter="url(#shadow)"
        className={`transition-all duration-300 ${
          isActive ? 'stroke-2 stroke-white' : ''
        }`}
      />
      
      <motion.g 
        transform="translate(100, 0)"
        initial={isAnimated ? { opacity: 0, x: -20 } : false}
        animate={isAnimated ? { opacity: 1, x: 0 } : false}
        transition={{ delay: 0.2 }}
      >
        <text 
          y="-10"
          className="text-xl font-semibold uppercase tracking-wider"
          fill="#1a2b4b"
        >
          {title}
        </text>
        <text 
          y="20"
          className="text-sm"
          fill="#64748b"
        >
          {description}
        </text>
      </motion.g>
    </GroupComponent>
  );
};

export default TreeNode;