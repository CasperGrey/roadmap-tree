// src/App.js
import React from 'react';
import TreeOfUp from './components/Tree';
import roadmapData from './data/roadmap';

const App = () => {
  return (
    <div className="app">
      <TreeOfUp roadmapData={roadmapData} />
    </div>
  );
};

export default App;
