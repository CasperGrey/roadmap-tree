import React from 'react';
import PageHeader from './components/header/PageHeader';
import AITree from './components/layout/AITree';

export default function App() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            viewBox="0 0 3432 2000"
            preserveAspectRatio="xMidYMid meet"
        >
            <defs>
                <clipPath id="headerClip">
                    <rect x="0" y="0" width="3432" height="700" />
                </clipPath>
                <clipPath id="treeClip">
                    <rect x="0" y="700" width="3432" height="1300" />
                </clipPath>
            </defs>

            {/* Background */}
            <rect width="3432" height="2000" fill="#1C3559" />

            {/* Header Section */}
            <g clipPath="url(#headerClip)">
                <PageHeader />
            </g>

            {/* Tree Section */}
            <g clipPath="url(#treeClip)" transform="translate(0, 690)">
                <AITree />
            </g>
        </svg>
    );
}