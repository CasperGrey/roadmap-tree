// src/App.tsx
import React from 'react';
import AITree from './components/layout/AITree';
import { ZoomableViewport } from './components/layout/ZoomableViewport';

export default function App() {
    return (
        <div id="root" className="fixed inset-0 overflow-hidden bg-[#1C3559]">
            <div className="w-full h-full">
                <ZoomableViewport initialWidth={3432} initialHeight={2000}>
                    <g>
                        {/* Main background */}
                        <rect width="3432" height="2000" fill="#1C3559"/>

                        {/* Logo and center line */}
                        <g transform="translate(1716, 300)">
                            <image
                                href="/assets/logo.png"
                                x="-75"
                                y="-75"
                                width="150"
                                height="150"
                            />
                        </g>

                        {/* Header Section with adjusted spacing */}
                        <g>
                            {/* White lines */}
                            <line x1="0" y1="400" x2="3432" y2="400" stroke="#ffffff" strokeWidth="8"/>
                            <line x1="0" y1="415" x2="3432" y2="415" stroke="#ffffff" strokeWidth="8"/>

                            {/* Blue lines */}
                            <line x1="0" y1="430" x2="3432" y2="430" stroke="#204B87" strokeWidth="8"/>
                            <line x1="0" y1="445" x2="3432" y2="445" stroke="#204B87" strokeWidth="8"/>

                            {/* Vertical center line */}
                            <line
                                x1="1716"
                                y1="445"
                                x2="1716"
                                y2="745"
                                stroke="#ffffff"
                                strokeWidth="8"
                            />
                        </g>

                        {/* Tree Section */}
                        <AITree startY={745} />
                    </g>
                </ZoomableViewport>
            </div>
            <div id="modal-root"></div>
        </div>
    );
}