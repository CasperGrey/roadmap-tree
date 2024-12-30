import React from 'react';
import { motion } from 'framer-motion';

export default function AITree() {
  const treeData = {
    title: "FOUNDATION",
    description: "Core AI governance and controls",
    children: [
      {
        title: "POLICY & GOVERNANCE",
        description: "Risk framework and controls",
      },
      {
        title: "SECURITY CONTROLS",
        description: "MS Purview implementation",
      }
    ]
  };

  return (
      <div className="relative w-full h-[800px] overflow-hidden">
        <svg
            width="100%"
            height="100%"
            viewBox="-500 -100 2000 1000"
            className="bg-transparent"
        >
          <defs>
            {/* Add glowing effect for hover */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Line gradient */}
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#003087" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#003087" stopOpacity="0.2"/>
            </linearGradient>
          </defs>

          {/* Connecting Lines */}
          {treeData.children.map((child, index) => (
              <motion.path
                  key={`line-${index}`}
                  d={`M 500,200 Q 500,${300 + index * 50} ${400 + index * 200},${400}`}
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
              />
          ))}

          {/* Nodes */}
          <motion.g
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
          >
            {/* Root Node */}
            <g transform="translate(500, 200)" className="cursor-pointer">
              <motion.circle
                  r="60"
                  fill="#003087"
                  className="transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  filter="url(#glow)"
              />
              <text
                  className="text-xl font-bold"
                  fill="white"
                  textAnchor="middle"
                  y="-10"
              >
                {treeData.title}
              </text>
              <text
                  className="text-sm"
                  fill="#94a3b8"
                  textAnchor="middle"
                  y="10"
              >
                {treeData.description}
              </text>
            </g>

            {/* Child Nodes */}
            {treeData.children.map((child, index) => (
                <motion.g
                    key={`node-${index}`}
                    transform={`translate(${400 + index * 200}, 400)`}
                    className="cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                >
                  <motion.circle
                      r="50"
                      fill="#1B365D"
                      className="transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      filter="url(#glow)"
                  />
                  <text
                      className="text-lg font-bold"
                      fill="white"
                      textAnchor="middle"
                      y="-8"
                  >
                    {child.title}
                  </text>
                  <text
                      className="text-xs"
                      fill="#94a3b8"
                      textAnchor="middle"
                      y="8"
                  >
                    {child.description}
                  </text>
                </motion.g>
            ))}
          </motion.g>
        </svg>
      </div>
  );
}