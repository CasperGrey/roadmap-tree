import React from 'react';
import { motion } from 'framer-motion';
import Node from './Node';
import Phase from './Phase';
import config from '../utils/config';
import '../styles/components/Tree.css';

const Tree = ({ roadmapData }) => {
  return (
    <div className="tree">
      <h1 className="tree-title">The Tree</h1>
      <div className="phases">
        {roadmapData.map((phase, index) => (
          <Phase
            key={index}
            name={phase.phase}
            focus={phase.focus}
            years={phase.years}
          />
        ))}
      </div>
    </div>
  );
};

export default Tree;
