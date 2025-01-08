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
}

export function ZoomableViewport({
                                     children,
                                     initialWidth = 3432,
                                     initialHeight = 2000,
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
            const newZoom = Math.max(0.5, Math.min(3, zoom * zoomFactor));

            const newWidth = initialWidth / newZoom;
            const newHeight = initialHeight / newZoom;

            const mouseViewportX = (mouseX / rect.width) * viewBox.width + viewBox.x;
            const mouseViewportY = (mouseY / rect.height) * viewBox.height + viewBox.y;

            const newX = mouseViewportX - (mouseX / rect.width) * newWidth;
            const newY = mouseViewportY - (mouseY / rect.height) * newHeight;

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

            const dx = event.clientX - dragStart.x;
            const dy = event.clientY - dragStart.y;
            const rect = container.getBoundingClientRect();

            const scaleX = viewBox.width / rect.width;
            const scaleY = viewBox.height / rect.height;

            setViewBox(prev => ({
                ...prev,
                x: prev.x - dx * scaleX,
                y: prev.y - dy * scaleY
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

        return () => {
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [zoom, viewBox, isDragging, dragStart, initialWidth, initialHeight]);

    return (
        <div
            ref={containerRef}
            className="w-full h-full overflow-hidden cursor-grab"
            style={{
                touchAction: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none'
            }}
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