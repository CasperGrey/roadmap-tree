import React from 'react';
import PageHeader from './components/header/PageHeader';
import AITree from './components/layout/AITree';

export default function App() {
    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-dark">
            {/* Header */}
            <div className="w-full">
                <PageHeader />
            </div>

            {/* Tree Section */}
            <div className="relative w-full flex-1 flex justify-center mt-[-10px]">
                <AITree />
            </div>
        </div>
    );
}