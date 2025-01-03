// src/components/decorative/Shapes.tsx
export function HeaderDecoration() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 300" width="100%" height="300">

            <rect width="100%" height="300" fill="#1C3559"/>


            <line x1="0" y1="250" x2="1920" y2="250" stroke="#204B87" stroke-width="4"/>


            <circle cx="960" cy="150" r="80" fill="none" stroke="#FFFFFF" stroke-width="6"/>

            <line x1="960" y1="70" x2="960" y2="150" stroke="#FFFFFF" stroke-width="4"/>
            <line x1="960" y1="90" x2="930" y2="130" stroke="#FFFFFF" stroke-width="4"/>
            <line x1="960" y1="90" x2="990" y2="130" stroke="#FFFFFF" stroke-width="4"/>
            <line x1="960" y1="110" x2="940" y2="140" stroke="#FFFFFF" stroke-width="4"/>
            <line x1="960" y1="110" x2="980" y2="140" stroke="#FFFFFF" stroke-width="4"/>
            <line x1="960" y1="130" x2="950" y2="150" stroke="#FFFFFF" stroke-width="4"/>
            <line x1="960" y1="130" x2="970" y2="150" stroke="#FFFFFF" stroke-width="4"/>


            <line x1="960" y1="150" x2="950" y2="250" stroke="#204B87" stroke-width="4"/>
            <line x1="960" y1="150" x2="970" y2="250" stroke="#204B87" stroke-width="4"/>


            <polygon points="870,250 890,220 910,250" fill="#204B87"/>
            <polygon points="1010,250 1030,220 1050,250" fill="#204B87"/>
            <polygon points="780,250 800,200 820,250" fill="#204B87"/>
            <polygon points="1100,250 1120,200 1140,250" fill="#204B87"/>


            <circle cx="960" cy="50" r="10" fill="#204B87"/>
            <circle cx="880" cy="200" r="6" fill="#204B87"/>
            <circle cx="1040" cy="200" r="6" fill="#204B87"/>
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
            <div className="w-full h-px bg-white opacity-60 mb-0.5"/>
            <div className="w-full h-px bg-white opacity-60 mb-2"/>

            {/* Blue lines */}
            <div className="space-y-1">
                <div className="w-full h-px bg-[#4A90E2] opacity-40"/>
                <div className="w-full h-px bg-[#4A90E2] opacity-40"/>
                <div className="w-full h-px bg-[#4A90E2] opacity-40"/>
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