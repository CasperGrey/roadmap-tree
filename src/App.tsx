import React from 'react';
import PageHeader from './components/header/PageHeader';
import AITree from './components/layout/AITree';
import { treeData } from './data/treeData';

export default function App() {
    return (
        <div className="min-h-screen" style={{ backgroundColor: '#1C3559' }}>
            <PageHeader />
            <AITree data={treeData} />
        </div>
    );
}