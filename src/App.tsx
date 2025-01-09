// src/App.tsx
import React, { useState } from 'react';
import AITree from './components/layout/AITree';
import { ZoomableViewport } from './components/layout/ZoomableViewport';
import { getParentNodes } from './utils/treePositionUtils';
import { treeData } from './data/treeData';
import { Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

export default function App() {
    const [isAdmin, setIsAdmin] = useState(false);
    const parentNodes = getParentNodes(treeData);
    const margin = 200;
    const totalWidth = 3432;
    const usableWidth = totalWidth - (margin * 2);
    const parentSpacing = usableWidth / (parentNodes.length - 1);

    // Updated vertical line measurements
    const verticalLineStartY = 445;
    const verticalLineEndY = 600;
    const parentNodeY = 800;
    const parentNodeRadius = 45;

    // Calculate diagonal lines path
    const getDiagonalLines = () => {
        return parentNodes.map((_, index) => {
            const parentX = margin + (index * parentSpacing);
            return `M ${parentX} ${parentNodeY - parentNodeRadius} L 1716 ${verticalLineEndY}`;
        }).join(' ');
    };

    return (
        <div id="root" className="fixed inset-0 overflow-hidden bg-[#1C3559]">
            {/* Admin Toggle Button */}
            <Button
                variant="contained"
                startIcon={<SettingsIcon />}
                onClick={() => setIsAdmin(!isAdmin)}
                style={{
                    position: 'fixed',
                    top: '1rem',
                    right: '1rem',
                    zIndex: 50,
                    backgroundColor: isAdmin ? '#f44336' : '#1976d2',
                    minWidth: '120px'
                }}
            >
                {isAdmin ? 'Exit Admin' : 'Admin Mode'}
            </Button>

            <div className="w-full h-full">
                <ZoomableViewport initialWidth={3432} initialHeight={2000}>
                    <g>
                        {/* Main background */}
                        <rect width="3432" height="2000" fill="#1C3559"/>

                        {/* Header Section */}
                        <g>
                            {/* Lines */}
                            <line x1="0" y1="400" x2="3432" y2="400" stroke="#ffffff" strokeWidth="8"/>
                            <line x1="0" y1="415" x2="3432" y2="415" stroke="#ffffff" strokeWidth="8"/>
                            <line x1="0" y1="430" x2="3432" y2="430" stroke="#204B87" strokeWidth="8"/>
                            <line x1="0" y1="445" x2="3432" y2="445" stroke="#204B87" strokeWidth="8"/>

                            {/* Cloud animations */}
                            <g>
                                {/* Left-moving clouds */}
                                <image
                                    href="/assets/icons8-clouds-50.png"
                                    width="160"
                                    height="120"
                                    y="100"
                                    className="animate-float-left"
                                    style={{ opacity: 0.7 }}
                                />
                                <image
                                    href="/assets/icons8-clouds-50.png"
                                    width="160"
                                    height="120"
                                    y="150"
                                    className="animate-float-left"
                                    style={{ animationDelay: '30s', opacity: 0.7 }}
                                />

                                {/* Right-moving clouds */}
                                <image
                                    href="/assets/icons8-clouds-50.png"
                                    width="160"
                                    height="120"
                                    y="180"
                                    className="animate-float-right"
                                    style={{ opacity: 0.7 }}
                                />
                                <image
                                    href="/assets/icons8-clouds-50.png"
                                    width="160"
                                    height="120"
                                    y="230"
                                    className="animate-float-right"
                                    style={{ animationDelay: '30s', opacity: 0.7 }}
                                />
                            </g>

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

                            {/* Vertical and Diagonal Lines */}
                            <line
                                x1="1716"
                                y1={verticalLineStartY}
                                x2="1716"
                                y2={verticalLineEndY}
                                stroke="#ffffff"
                                strokeWidth="8"
                            />
                            <path
                                d={getDiagonalLines()}
                                stroke="#ffffff"
                                strokeWidth="8"
                                fill="none"
                            />
                        </g>

                        {/* Tree Section */}
                        <AITree startY={800} showButtons={isAdmin} />
                    </g>
                </ZoomableViewport>
            </div>
            <div id="modal-root"></div>
        </div>
    );
}