
export default function PageHeader() {
    return (
        <div className="relative h-48"> {/* Reduced height */}
            {/* Content - moved to top */}
            <div className="relative z-10 pt-8 text-center">
                <h1 className="text-4xl text-white mb-2 font-karla"> {/* Reduced text size */}
                    AI Capability Tree
                </h1>
                <p className="text-lg text-gray-400 font-poppins">
                    Roadmap for AI implementation
                </p>
            </div>

            {/* Background decorations */}
            <div className="absolute bottom-0 left-0 right-0">
                {/* Horizontal lines as ground - full width */}
                <svg className="w-full h-24" preserveAspectRatio="none">
                    {[...Array(6)].map((_, i) => (
                        <line
                            key={i}
                            x1="0"
                            y1={i * 4 + 80}  // Starting from bottom
                            x2="100%"
                            y2={i * 4 + 80}
                            stroke="#4A90E2"
                            strokeWidth="1"
                            className="opacity-20"
                        />
                    ))}
                </svg>

                {/* Mountains above the lines */}
                <div className="absolute bottom-16 w-full">
                    <svg className="w-full h-16" preserveAspectRatio="none">
                        {/* Multiple mountain ranges with different opacities */}
                        <path
                            d="M0,60 L20,30 L40,50 L60,20 L80,40 L100,10 L120,45 L140,15 L160,35 L180,5 L200,45 L100%,60"
                            fill="#4A90E2"
                            className="opacity-10"
                        />
                        <path
                            d="M0,60 L40,20 L80,50 L120,10 L160,40 L200,15 L100%,60"
                            fill="#4A90E2"
                            className="opacity-15"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}