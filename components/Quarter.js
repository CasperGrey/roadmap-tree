import React from 'react';
import { motion } from 'framer-motion';
import './Quarter.css';

const Quarter = ({ name, activities }) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="quarter">
      <h4 className="quarter-name">{name}</h4>
      <ul className="quarter-activities">
        {activities.map((activity, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            className="quarter-activity"
          >
            {activity}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Quarter;
