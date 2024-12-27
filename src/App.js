// src/App.js
import React from 'react';
import Tree from './components/Tree';
import roadmapData from './data/roadmap';

const App = () => {
  return (
    <div className="app">
      <Tree roadmapData={roadmapData} />
    </div>
  );
};

export default App;
