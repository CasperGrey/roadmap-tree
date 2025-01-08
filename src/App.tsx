// src/App.tsx
import React from 'react';
import AITree from './components/layout/AITree';
import { ZoomableViewport } from './components/layout/ZoomableViewport';

export default function App() {
    return (
        <div id="root" className="fixed top-0 left-0 w-full min-h-screen">
            <ZoomableViewport initialWidth={3432} initialHeight={2000}>
                <g>
                    {/* Main background */}
                    <rect width="3432" height="2000" fill="#1C3559"/>

                    {/* Header Section */}
                    <g>
                        {/* White lines */}
                        <line x1="0" y1="100" x2="3432" y2="100" stroke="#ffffff" strokeWidth="8"/>
                        <line x1="0" y1="200" x2="3432" y2="200" stroke="#ffffff" strokeWidth="8"/>

                        {/* Blue lines */}
                        <line x1="0" y1="300" x2="3432" y2="300" stroke="#204B87" strokeWidth="8"/>
                        <line x1="0" y1="400" x2="3432" y2="400" stroke="#204B87" strokeWidth="8"/>

                        {/* Logo and center line */}
                        <g transform="translate(1716, 400)">
                            <image
                                href="/assets/logo.png"
                                x="-75"
                                y="-150"
                                width="150"
                                height="150"
                            />
                            <line x1="0" y1="0" x2="0" y2="300" stroke="#ffffff" strokeWidth="8"/>
                        </g>

                        {/* Decorative elements */}
                        <g>
                            {/* Left Clouds */}
                            <circle cx="400" cy="150" r="80" fill="#ffffff" opacity="0.7" />
                            <circle cx="600" cy="180" r="60" fill="#ffffff" opacity="0.7" />

                            {/* Right Clouds */}
                            <circle cx="2800" cy="150" r="80" fill="#ffffff" opacity="0.7" />
                            <circle cx="3000" cy="180" r="60" fill="#ffffff" opacity="0.7" />
                        </g>
                    </g>

                    <AITree startY={690} />
                </g>
            </ZoomableViewport>
            <div id="modal-root"></div>
        </div>
    );
}