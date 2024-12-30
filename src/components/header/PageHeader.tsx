// src/components/header/PageHeader.tsx
export default function PageHeader() {
    return (
        <div className="relative">
            {/* Title section */}
            <div className="pt-8 px-8">
                <h1 className="text-4xl text-white font-karla">
                    AI Capability Tree
                </h1>
                <p className="text-gray-400 font-poppins mt-2">
                    Roadmap for AI implementation
                </p>
            </div>

            {/* Top left decorative elements */}
            <div className="absolute top-20 left-8">
                {/* Horizontal lines */}
                <svg className="w-48 h-12 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <line
                            key={i}
                            x1="0"
                            y1={i * 4}
                            x2="100%"
                            y2={i * 4}
                            stroke="#4A90E2"
                            strokeWidth="1"
                            className="opacity-20"
                        />
                    ))}
                </svg>

                {/* Mountains */}
                <svg className="w-48 h-16">
                    <path
                        d="M0,32 L12,12 L24,24 L36,8 L48,28 L60,16 L72,24 L84,4 L96,20 L108,8 L120,32"
                        fill="#4A90E2"
                        className="opacity-20"
                    />
                </svg>
            </div>

            {/* Wave divider - spans full width */}
            <div className="absolute bottom-0 w-full">
                <svg
                    className="w-full h-32"
                    preserveAspectRatio="none"
                    viewBox="0 0 1200 100"
                >
                    <path
                        d="M0,50 C300,20 900,80 1200,50 L1200,100 L0,100 Z"
                        fill="white"
                        opacity="0.1"
                    />
                </svg>
            </div>
        </div>
    );
}