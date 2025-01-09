// src/App.tsx
import React from 'react';
import AITree from './components/layout/AITree';
import { ZoomableViewport } from './components/layout/ZoomableViewport';
import { getParentNodes } from './utils/treePositionUtils';
import { treeData } from './data/treeData';

export default function App() {
    const parentNodes = getParentNodes(treeData);
    const margin = 200;
    const totalWidth = 3432;
    const usableWidth = totalWidth - (margin * 2);
    const parentSpacing = usableWidth / (parentNodes.length - 1);

    return (
        <div id="root" className="fixed inset-0 overflow-hidden bg-[#1C3559]">
            <div className="w-full h-full">
                <ZoomableViewport initialWidth={3432} initialHeight={2000}>
                    <g>
                        {/* Main background */}
                        <rect width="3432" height="2000" fill="#1C3559"/>

                        {/* Header Section */}
                        <g>
                            {/* Decorative elements - Placed above lines */}
                            <g>
                                {/* Left Clouds */}
                                <g transform="translate(400, 150)" opacity="0.7" fill="#ffffff">
                                    <path d="M21.5,21.5v129h64.5v-32.25v-64.5v-32.25zM86,53.75c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25c-17.7805,0 -32.25,14.4695 -32.25,32.25zM118.25,86c-17.7805,0 -32.25,14.4695 -32.25,32.25c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25z"/>
                                </g>
                                <g transform="translate(2800, 150)" opacity="0.7" fill="#ffffff">
                                    <path d="M21.5,21.5v129h64.5v-32.25v-64.5v-32.25zM86,53.75c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25c-17.7805,0 -32.25,14.4695 -32.25,32.25zM118.25,86c-17.7805,0 -32.25,14.4695 -32.25,32.25c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25z"/>
                                </g>
                            </g>

                            {/* Lines */}
                            <line x1="0" y1="400" x2="3432" y2="400" stroke="#ffffff" strokeWidth="8"/>
                            <line x1="0" y1="415" x2="3432" y2="415" stroke="#ffffff" strokeWidth="8"/>
                            <line x1="0" y1="430" x2="3432" y2="430" stroke="#204B87" strokeWidth="8"/>
                            <line x1="0" y1="445" x2="3432" y2="445" stroke="#204B87" strokeWidth="8"/>

                            {/* Logo */}
                            <g transform="translate(1716, 300)">
                                <image
                                    href="/assets/logo.png"
                                    x="-75"
                                    y="-75"
                                    width="150"
                                    height="150"
                                />
                            </g>

                            {/* Vertical center line and connections to parent nodes */}
                            <path
                                d={`M 1716 445 L 1716 800 
                                    ${parentNodes.map((_, i) => {
                                    const x = margin + (i * parentSpacing);
                                    return `M 1716 800 L ${x} 800`;
                                }).join(' ')}`}
                                stroke="#ffffff"
                                strokeWidth="8"
                                fill="none"
                            />
                        </g>

                        {/* Tree Section */}
                        <AITree startY={800} />
                    </g>
                </ZoomableViewport>
            </div>
            <div id="modal-root"></div>
        </div>
    );
}