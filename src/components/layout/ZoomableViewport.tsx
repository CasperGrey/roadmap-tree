// src/components/layout/ZoomableViewport.tsx
import React, { useState, useEffect, useRef, ReactElement } from 'react';

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
    minZoom?: number;
    maxZoom?: number;
}

export function ZoomableViewport({
                                     children,
                                     initialWidth = 3432,
                                     initialHeight = 2000,
                                     minZoom = 0.5,
                                     maxZoom = 3
                                 }: ZoomableViewportProps): ReactElement {
    const [zoom, setZoom] = useState(1);
    const [viewBox, setViewBox] = useState<ViewportState>({
        x: 0,
        y: 0,
        width: initialWidth,
        height: initialHeight
    });
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (event: WheelEvent) => {
            event.preventDefault();
            const rect = container.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const zoomFactor = event.deltaY > 0 ? 1.1 : 0.9;
            const newZoom = Math.max(minZoom, Math.min(maxZoom, zoom * zoomFactor));

            // Convert mouse position to SVG coordinates
            const svgPoint = {
                x: (mouseX / rect.width) * viewBox.width + viewBox.x,
                y: (mouseY / rect.height) * viewBox.height + viewBox.y
            };

            const newWidth = initialWidth / newZoom;
            const newHeight = initialHeight / newZoom;

            // Calculate new viewBox coordinates to zoom towards mouse position
            const newX = svgPoint.x - (mouseX / rect.width) * newWidth;
            const newY = svgPoint.y - (mouseY / rect.height) * newHeight;

            setZoom(newZoom);
            setViewBox({
                x: newX,
                y: newY,
                width: newWidth,
                height: newHeight
            });
        };

        const handleMouseDown = (event: MouseEvent) => {
            setIsDragging(true);
            setDragStart({ x: event.clientX, y: event.clientY });
            container.style.cursor = 'grabbing';
        };

        const handleMouseMove = (event: MouseEvent) => {
            if (!isDragging) return;

            const rect = container.getBoundingClientRect();
            const dx = ((event.clientX - dragStart.x) / rect.width) * viewBox.width;
            const dy = ((event.clientY - dragStart.y) / rect.height) * viewBox.height;

            setViewBox(prev => ({
                ...prev,
                x: prev.x - dx,
                y: prev.y - dy
            }));

            setDragStart({ x: event.clientX, y: event.clientY });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            container.style.cursor = 'grab';
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        container.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        // Set initial cursor
        container.style.cursor = 'grab';

        return () => {
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [zoom, viewBox, isDragging, dragStart, initialWidth, initialHeight, minZoom, maxZoom]);

    return (
        <div
            ref={containerRef}
            className="w-full h-full overflow-hidden"
            style={{ height: `${initialHeight}px` }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
                preserveAspectRatio="xMidYMid meet"
            >
                {children}
            </svg>
        </div>
    );
}