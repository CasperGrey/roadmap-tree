// src/components/decorative/Shapes.tsx
export function HeaderDecoration() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 300" width="100%" height="300"  className="w-full">
            <rect width="100%" height="300" fill="#1C3559"/>

            {/* Horizon Line */}
            <line x1="0" y1="260" x2="1920" y2="260" stroke="white" strokeWidth="2"/>
            <line x1="0" y1="265" x2="1920" y2="265" stroke="white" strokeWidth="2"/>
            <line x1="0" y1="275" x2="1920" y2="275" stroke="#204B87" strokeWidth="2"/>
            <line x1="0" y1="280" x2="1920" y2="280" stroke="#204B87" strokeWidth="2"/>
            <line x1="0" y1="285" x2="1920" y2="285" stroke="#204B87" strokeWidth="2"/>

            {/* Small Abstract Trees */}
            <polygon points="800,220 810,200 820,220" fill="#204B87"/>
            <polygon points="1120,220 1130,190 1140,220" fill="#204B87"/>
            <polygon points="880,220 890,210 900,220" fill="#204B87"/>
            <polygon points="1040,220 1050,200 1060,220" fill="#204B87"/>

            {/* Additional Geometric Shapes */}
            <circle cx="840" cy="120" r="10" fill="#204B87"/>
            <circle cx="1080" cy="160" r="8" fill="#204B87"/>
            <rect x="920" y="200" width="80" height="10" fill="#204B87"/>
        </svg>
    );
}

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