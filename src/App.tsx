import React from 'react';
import PageHeader from './components/header/PageHeader';
import AITree from './components/layout/AITree';
import { treeData } from './data/treeData';

export default function App() {
    return (
        <div className="min-h-screen bg-[#1C3559]">
            <PageHeader />
            <div className="relative">
                {/* Connecting element from header to tree */}
                <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24">
                    <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="100%"
                        stroke="#4A90E2"
                        strokeWidth="2"
                        className="opacity-20"
                    />
                </svg>
                <AITree data={treeData} />
            </div>
        </div>
    );
}