// src/App.tsx
import React from 'react';
import PageHeader from './components/header/PageHeader';
import AITree from './components/layout/AITree';

export default function App() {
    return (
        <div id="root">
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

                {/* Main background */}
                <rect width="3432" height="2000" fill="#1C3559"/>

                {/* Header Section */}
                <g clipPath="url(#headerClip)">
                    <g>
                        {/* Header background */}
                        <rect width="3432" height="700" fill="#1C3559"/>

                        {/* White lines */}
                        <line x1="0" y1="100" x2="3432" y2="100" stroke="#ffffff" strokeWidth="8"/>
                        <line x1="0" y1="200" x2="3432" y2="200" stroke="#ffffff" strokeWidth="8"/>

                        {/* Blue lines */}
                        <line x1="0" y1="300" x2="3432" y2="300" stroke="#204B87" strokeWidth="8"/>
                        <line x1="0" y1="400" x2="3432" y2="400" stroke="#204B87" strokeWidth="8"/>
                    </g>

                    {/* Logo and center line group */}
                    <g transform="translate(1716, 400)">
                        <image
                            href="/assets/logo.png"
                            x="-75"
                            y="-150"
                            width="150"
                            height="150"
                        />
                        <line
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="300"
                            stroke="#ffffff"
                            strokeWidth="8"
                        />
                    </g>
                </g>

                {/* Tree Section */}
                <g clipPath="url(#treeClip)" transform="translate(0, 690)">
                    <AITree />
                </g>
            </svg>
            <div id="modal-root"></div>
        </div>
    );
}