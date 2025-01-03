// src/components/layout/ZoomableViewport.tsx
import React, { useState, useCallback } from 'react';

interface ViewportState {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface ZoomableViewportProps {
    children: React.ReactNode;
    initialWidth?: number;
    initialHeight?: number;
    height?: number; // Add this prop
}

export function ZoomableViewport({
                                     children,
                                     initialWidth = 2241.46,
                                     initialHeight = 1337.12,
                                     height // Optional height override
                                 }: ZoomableViewportProps) {
    const [zoom, setZoom] = useState(1);
    const [viewBox, setViewBox] = useState<ViewportState>({
        x: 0,
        y: 0,
        width: initialWidth,
        height: height || initialHeight
    });

    const handleWheel = useCallback((event: React.WheelEvent) => {
        event.preventDefault();
        const zoomFactor = event.deltaY > 0 ? 1.1 : 0.9;
        const newZoom = zoom * zoomFactor;

        if (newZoom < 0.5 || newZoom > 3) return;

        const newWidth = viewBox.width * zoomFactor;
        const newHeight = (height || initialHeight) * zoomFactor;
        const mouseX = event.nativeEvent.offsetX;
        const mouseY = event.nativeEvent.offsetY;
        const newX = viewBox.x + (mouseX / zoom) * (1 - zoomFactor);
        const newY = viewBox.y + (mouseY / zoom) * (1 - zoomFactor);

        setZoom(newZoom);
        setViewBox({
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight
        });
    }, [zoom, viewBox, height, initialHeight]);

    return (
        <div
            className="relative"
            style={{
                left: '24px',
                width: `${initialWidth}px`,
                height: `${height || initialHeight}px`,
                marginTop: '-15px'
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
                onWheel={handleWheel}
            >
                {children}
            </svg>
        </div>
    );
}