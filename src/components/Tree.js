// src/components/Tree.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Node from './Node';
import Phase from './Phase';
import config from '../utils/config';
import './Tree.css';

const Tree = ({ roadmapData }) => {
  const [expandedNode, setExpandedNode] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const nodeVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500
      }
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="tree">
      <h1 className="tree-title">The Tree of Up</h1>
      <div className="phases">
        {roadmapData.map((phase, index) => (
          <Phase
            key={index}
            name={phase.phase}
            focus={phase.focus}
            years={phase.years}
            expandedNode={expandedNode}
            setExpandedNode={setExpandedNode}
            containerVariants={containerVariants}
            nodeVariants={nodeVariants}
            modalVariants={modalVariants}
          />
        ))}
      </div>
    </div>
  );
};

export default Tree;