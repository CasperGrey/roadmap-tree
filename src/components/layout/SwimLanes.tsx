// src/components/layout/SwimLanes.tsx
import React from 'react';
import { SwimLane } from '../../types/tree';

interface SwimLanesProps {
    heights: Record<SwimLane, number>;
}

export function SwimLanes({ heights }: SwimLanesProps) {
    const lanes: { name: string; key: SwimLane }[] = [
        { name: 'Enable', key: 'enable' },
        { name: 'Engage', key: 'engage' },
        { name: 'Evolve', key: 'evolve' }
    ];

    let currentY = 0;
    const totalWidth = 2241.46;

    return (
        <g className="swimlanes">
            {lanes.map(({ name, key }) => {
                const laneHeight = heights[key];
                const lane = (
                    <g key={key}>
                        {/* Background for the lane */}
                        <rect
                            x="0"
                            y={currentY}
                            width={totalWidth}
                            height={laneHeight}
                            fill="transparent"
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="1"
                        />

                        {/* Lane name */}
                        <text
                            x="24"
                            y={currentY + 40}
                            fill="rgba(255, 255, 255, 0.6)"
                            className="text-lg font-light"
                        >
                            {name}
                        </text>

                        {/* Guide lines (optional) */}
                        <line
                            x1="0"
                            y1={currentY}
                            x2={totalWidth}
                            y2={currentY}
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="1"
                            strokeDasharray="5,5"
                        />
                    </g>
                );

                // Update Y position for next lane
                currentY += laneHeight;
                return lane;
            })}
        </g>
    );
}