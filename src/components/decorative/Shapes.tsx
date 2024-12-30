// src/components/decorative/Shapes.tsx
export function Mountains() {
    return (
        <svg className="w-32 h-8">
            <path
                d="M0,16 L8,0 L16,16 L24,4 L32,16 L40,0 L48,16"
                fill="#4A90E2"
                opacity="0.4"
            />
        </svg>
    );
}

export function Lines() {
    return (
        <div className="w-full">
            {/* White lines */}
            <div className="w-full h-px bg-white opacity-60 mb-0.5" />
            <div className="w-full h-px bg-white opacity-60 mb-2" />

            {/* Blue lines */}
            <div className="space-y-1">
                <div className="w-full h-px bg-[#4A90E2] opacity-40" />
                <div className="w-full h-px bg-[#4A90E2] opacity-40" />
                <div className="w-full h-px bg-[#4A90E2] opacity-40" />
            </div>
        </div>
    );
}

export function HorizontalLines() {
    return (
        <svg className="w-full h-8">
            {[...Array(4)].map((_, i) => (
                <line
                    key={i}
                    x1="0"
                    y1={i * 3}
                    x2="100%"
                    y2={i * 3}
                    stroke="#4A90E2"
                    strokeWidth="1"
                    opacity="0.4"
                />
            ))}
        </svg>
    );
}