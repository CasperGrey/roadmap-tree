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
    initialHeight?: number;
}

export function ZoomableViewport({
                                     children,
                                     initialHeight = 2000,
                                 }: ZoomableViewportProps): ReactElement {
    const [zoom, setZoom] = useState(1);
    const [viewBox, setViewBox] = useState<ViewportState>({
        x: 0,
        y: 0,
        width: 3432,
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
            const newZoom = Math.max(0.5, Math.min(3, zoom * zoomFactor));

            const newWidth = viewBox.width * zoomFactor;
            const newHeight = viewBox.height * zoomFactor;

            // Calculate new viewBox coordinates to zoom towards mouse position
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

        const handleMouseDown = (event: MouseEvent) => {
            setIsDragging(true);
            setDragStart({ x: event.clientX, y: event.clientY });
        };

        const handleMouseMove = (event: MouseEvent) => {
            if (!isDragging) return;

            const dx = (event.clientX - dragStart.x) * (viewBox.width / container.clientWidth);
            const dy = (event.clientY - dragStart.y) * (viewBox.height / container.clientHeight);

            setViewBox(prev => ({
                ...prev,
                x: prev.x - dx,
                y: prev.y - dy
            }));

            setDragStart({ x: event.clientX, y: event.clientY });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        container.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [zoom, viewBox, isDragging, dragStart]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden cursor-move"
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