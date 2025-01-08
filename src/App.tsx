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
                                {/* Left Cloud */}
                                <g transform="translate(400, 150)">
                                    <svg
                                        x="-50"
                                        y="-50"
                                        width="100"
                                        height="100"
                                        viewBox="0 0 172 172"
                                        opacity="0.7"
                                    >
                                        <g fill="#ffffff">
                                            <path d="M21.5,21.5v129h64.5v-32.25v-64.5v-32.25zM86,53.75c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25c-17.7805,0 -32.25,14.4695 -32.25,32.25zM118.25,86c-17.7805,0 -32.25,14.4695 -32.25,32.25c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25z"/>
                                        </g>
                                    </svg>
                                </g>

                                {/* Right Cloud */}
                                <g transform="translate(2800, 150)">
                                    <svg
                                        x="-50"
                                        y="-50"
                                        width="100"
                                        height="100"
                                        viewBox="0 0 172 172"
                                        opacity="0.7"
                                    >
                                        <g fill="#ffffff">
                                            <path d="M21.5,21.5v129h64.5v-32.25v-64.5v-32.25zM86,53.75c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25c-17.7805,0 -32.25,14.4695 -32.25,32.25zM118.25,86c-17.7805,0 -32.25,14.4695 -32.25,32.25c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25z"/>
                                        </g>
                                    </svg>
                                </g>

                                {/* Car */}
                                <g transform="translate(3000, 180)">
                                    <svg
                                        x="-50"
                                        y="-50"
                                        width="100"
                                        height="100"
                                        viewBox="0 0 172 172"
                                        opacity="0.7"
                                    >
                                        <g fill="#ffffff">
                                            <path d="M21.5,21.5v129h64.5v-32.25v-64.5v-32.25zM86,53.75c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25c-17.7805,0 -32.25,14.4695 -32.25,32.25zM118.25,86c-17.7805,0 -32.25,14.4695 -32.25,32.25c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25z"/>
                                        </g>
                                    </svg>
                                </g>
                            </g>
                        </g>

                        <AITree />
                    </g>
                </ZoomableViewport>
            </div>
            <div id="modal-root"></div>
        </div>
    );
}