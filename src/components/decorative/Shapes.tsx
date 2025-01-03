// src/components/decorative/Shapes.tsx
export function HeaderDecoration() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 300" width="100%" height="300">

            <rect width="100%" height="300" fill="#1C3559"/>


            <line x1="0" y1="260" x2="1920" y2="260" stroke="#204B87" stroke-width="4"/>
            <line x1="0" y1="265" x2="1920" y2="265" stroke="#204B87" stroke-width="4"/>
            <line x1="0" y1="270" x2="1920" y2="270" stroke="#204B87" stroke-width="4"/>
            <line x1="0" y1="275" x2="1920" y2="275" stroke="#204B87" stroke-width="4"/>
            <line x1="0" y1="280" x2="1920" y2="280" stroke="#204B87" stroke-width="4"/>


            <circle cx="960" cy="150" r="100" fill="none" stroke="#FFFFFF" stroke-width="6"/>


            <line x1="960" y1="50" x2="960" y2="150" stroke="#FFFFFF" stroke-width="4"/>
            <line x1="960" y1="70" x2="930" y2="100" stroke="#FFFFFF" stroke-width="4"/>
            <line x1="960" y1="70" x2="990" y2="100" stroke="#FFFFFF" stroke-width="4"/>
            <line x1="960" y1="90" x2="920" y2="130" stroke="#FFFFFF" stroke-width="4"/>
            <line x1="960" y1="90" x2="1000" y2="130" stroke="#FFFFFF" stroke-width="4"/>
            <line x1="960" y1="110" x2="940" y2="150" stroke="#FFFFFF" stroke-width="4"/>
            <line x1="960" y1="110" x2="980" y2="150" stroke="#FFFFFF" stroke-width="4"/>


            <line x1="960" y1="150" x2="950" y2="260" stroke="#FFFFFF" stroke-width="4"/>
            <line x1="960" y1="150" x2="970" y2="260" stroke="#FFFFFF" stroke-width="4"/>


            <polygon points="850,260 870,230 890,260" fill="#204B87"/>
            <polygon points="1030,260 1050,230 1070,260" fill="#204B87"/>
            <polygon points="910,260 930,200 950,260" fill="#204B87"/>
            <polygon points="970,260 990,200 1010,260" fill="#204B87"/>


            <polygon points="700,280 770,180 840,280" fill="#204B87"/>
            <polygon points="850,280 920,180 990,280" fill="#204B87"/>
            <polygon points="1030,280 1100,180 1170,280" fill="#204B87"/>
            <polygon points="1180,280 1250,180 1320,280" fill="#204B87"/>


            <circle cx="960" cy="30" r="8" fill="#204B87"/>
            <circle cx="940" cy="230" r="6" fill="#204B87"/>
            <circle cx="980" cy="230" r="6" fill="#204B87"/>
            <circle cx="910" cy="250" r="4" fill="#204B87"/>
            <circle cx="1010" cy="250" r="4" fill="#204B87"/>


            <line x1="860" y1="200" x2="1060" y2="200" stroke="#204B87" stroke-width="2"/>
            <line x1="880" y1="220" x2="1040" y2="220" stroke="#204B87" stroke-width="2"/>
            <line x1="900" y1="240" x2="1020" y2="240" stroke="#204B87" stroke-width="2"/>
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