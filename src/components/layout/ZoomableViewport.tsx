// src/components/layout/ZoomableViewport.tsx
import React, { useState, useRef, useEffect } from 'react';

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
}

export function ZoomableViewport({
                                     children,
                                     initialWidth = 2241.46,
                                     initialHeight = 1337.12
                                 }: ZoomableViewportProps) {
    const [zoom, setZoom] = useState(1);
    const [viewBox, setViewBox] = useState<ViewportState>({
        x: 0,
        y: 0,
        width: initialWidth,
        height: initialHeight
    });

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (event: WheelEvent) => {
            event.preventDefault();
            const zoomFactor = event.deltaY > 0 ? 1.1 : 0.9;
            const newZoom = zoom * zoomFactor;

            if (newZoom < 0.5 || newZoom > 3) return;

            const newWidth = viewBox.width * zoomFactor;
            const newHeight = viewBox.height * zoomFactor;
            const mouseX = event.offsetX;
            const mouseY = event.offsetY;
            const newX = viewBox.x + (mouseX / zoom) * (1 - zoomFactor);
            const newY = viewBox.y + (mouseY / zoom) * (1 - zoomFactor);

            setZoom(newZoom);
            setViewBox({
                x: newX,
                y: newY,
                width: newWidth,
                height: newHeight
            });
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, [zoom, viewBox]);

    return (
        <div
            ref={containerRef}
            className="relative"
            style={{
                left: '24px',
                width: `${initialWidth}px`,
                height: `${initialHeight}px`,
                marginTop: '-15px'
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
            >
                {children}
            </svg>
        </div>
    );
}