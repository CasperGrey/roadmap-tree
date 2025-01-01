import React from 'react';
import AITree from './components/layout/AITree';
import PageHeader from './components/header/PageHeader';
import { treeData } from './data/treeData';

export default function App() {
    return (
        <div className="min-h-screen bg-[#1C3559]">
            <PageHeader />
            <AITree data={treeData} />
        </div>
    );
}