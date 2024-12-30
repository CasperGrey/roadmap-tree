export function Mountains() {
    return (
        <svg className="absolute bottom-0 w-full h-24 opacity-20">
            <path
                d="M0,100 L25,60 L50,80 L75,40 L100,70 L100,100 L0,100"
                fill="#4A90E2"
            />
            {/* Add more mountain shapes */}
        </svg>
    );
}

export function Trees() {
    return (
        <svg className="absolute bottom-0 w-full h-32 opacity-20">
            {[...Array(10)].map((_, i) => (
                <path
                    key={i}
                    d={`M${30 + i * 100},100 L${50 + i * 100},60 L${70 + i * 100},100 Z`}
                    fill="#4A90E2"
                    opacity="0.3"
                />
            ))}
        </svg>
    );
}