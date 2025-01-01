// src/components/layout/SwimLanes.tsx
export function SwimLanes() {
    const lanes = ['Enable', 'Engage', 'Evolve'];
    const laneHeight = 1337.12 / 3;

    return (
        <g className="swimlanes">
            {lanes.map((lane, index) => (
                <g key={lane}>
                    <rect
                        x="0"
                        y={index * laneHeight}
                        width="2241.46"
                        height={laneHeight}
                        fill="transparent"
                        stroke="rgba(255, 255, 255, 0.1)"
                    />
                    <text
                        x="24"
                        y={index * laneHeight + 40}
                        fill="rgba(255, 255, 255, 0.6)"
                        className="text-lg font-light"
                    >
                        {lane}
                    </text>
                </g>
            ))}
        </g>
    );
}