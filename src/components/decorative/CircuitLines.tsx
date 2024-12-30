export function CircuitLines() {
    return (
        <svg className="absolute top-0 w-full h-full opacity-10">
            {[...Array(20)].map((_, i) => (
                <line
                    key={i}
                    x1="0"
                    y1={50 + i * 30}
                    x2="100%"
                    y2={50 + i * 30}
                    stroke="#4A90E2"
                    strokeWidth="1"
                />
            ))}
        </svg>
    );
}