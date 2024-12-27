import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Quarter from './Quarter';
import './Phase.css';

const Phase = ({ name, focus, years }) => {
  const [expandedYear, setExpandedYear] = useState(null);

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

  const yearVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      className="phase"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="phase-header">
        <h2 className="phase-name">{name}</h2>
        <p className="phase-focus">{focus}</p>
      </div>
      {years.map((year, index) => (
        <motion.div
          key={index}
          className={`year ${expandedYear === index ? 'expanded' : ''}`}
          variants={yearVariants}
          onClick={() => setExpandedYear(expandedYear === index ? null : index)}
        >
          <h3 className="year-name">{year.year}</h3>
          <AnimatePresence>
            {expandedYear === index && (
              <motion.div
                className="year-quarters"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                {year.quarters.map((quarter, quarterIndex) => (
                  <Quarter
                    key={quarterIndex}
                    name={quarter.name}
                    activities={quarter.activities}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Phase;
