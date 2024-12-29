import React from 'react';
import AITree from './components/layout/AITree';

const App: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-gray-50">
      <div className="text-2xl p-4 font-bold text-blue-600">AI Capability Tree</div>
      <AITree />
    </div>
  );
};

export default App;