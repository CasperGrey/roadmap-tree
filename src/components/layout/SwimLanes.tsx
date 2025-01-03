// src/components/layout/SwimLanes.tsx
interface SwimLanesProps {
    heights: {
        enable: number;
        engage: number;
        evolve: number;
    };
}

export function SwimLanes({ heights }: SwimLanesProps) {
    const lanes = [
        { name: 'Enable', height: heights.enable },
        { name: 'Engage', height: heights.engage },
        { name: 'Evolve', height: heights.evolve }
    ];

    let currentY = 0;

    return (
        <g className="swimlanes">
            {lanes.map(({ name, height }) => {
                const lane = (
                    <g key={name}>
                        <rect
                            x="0"
                            y={currentY}
                            width="2241.46"
                            height={height}
                            fill="transparent"
                            stroke="rgba(255, 255, 255, 0.1)"
                        />
                        <text
                            x="24"
                            y={currentY + 40}
                            fill="rgba(255, 255, 255, 0.6)"
                            className="text-lg font-light"
                        >
                            {name}
                        </text>
                    </g>
                );
                currentY += height;
                return lane;
            })}
        </g>
    );
}