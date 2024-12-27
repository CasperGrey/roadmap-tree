import React from 'react';
import './Node.css';

const Node = ({ icon, label }) => {
  return (
    <div className="node">
      <div className="node-icon">{icon}</div>
      <div className="node-label">{label}</div>
    </div>
  );
};

export default Node;
