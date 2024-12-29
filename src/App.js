// src/App.js
import React from 'react';
import AITree from './components/AITree';

function App() {
  return (
    <div className="w-screen h-screen bg-white">
      <div className="text-2xl p-4">AI Capability Tree</div>
      <AITree />
    </div>
  );
}

export default App;