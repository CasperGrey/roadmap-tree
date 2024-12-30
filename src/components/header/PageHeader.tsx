import { AILogo } from './AILogo';
import { Trees, Mountains } from '../decorative/Shapes';
import { CircuitLines } from '../decorative/CircuitLines';

export default function PageHeader() {
    return (
        <div className="relative py-16">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <CircuitLines />
                <div className="absolute top-8 right-8 flex space-x-4">
                    {/* Decorative elements */}
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="w-8 h-8 rounded-full border border-blue-400 opacity-20"
                        />
                    ))}
                </div>
                <Trees />
                <Mountains />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
                <AILogo />

                <h1 className="text-6xl text-white mb-6 font-karla">
                    AI Capability Tree
                </h1>

                <div className="flex items-center justify-center space-x-2 mb-8">
                    <div className="w-2 h-2 rounded-full bg-white"/>
                    <div className="w-24 h-px bg-white"/>
                    <div className="w-2 h-2 rounded-full bg-white"/>
                </div>

                <p className="text-xl text-gray-400 font-poppins">
                    Roadmap for AI implementation
                </p>
            </div>
        </div>
    );
}