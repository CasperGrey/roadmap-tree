// src/components/layout/SwimLanes.tsx
interface SwimLanesProps {
    height: number;  // Calculated based on content
}

export function SwimLanes({ height }: SwimLanesProps) {
    return (
        <div className="absolute left-0 w-full" style={{ height }}>
            {['enable', 'engage', 'evolve'].map((lane, index) => (
                <div
                    key={lane}
                    className="border-t border-white/10"
                    style={{
                        top: `${(index * 100) / 3}%`,
                        height: `${100 / 3}%`,
                        position: 'absolute',
                        width: '100%'
                    }}
                >
          <span className="absolute -top-4 left-4 text-white/40 uppercase text-sm">
            {lane}
          </span>
                </div>
            ))}
        </div>
    );
}