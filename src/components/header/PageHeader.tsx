// Updated PageHeader.tsx
import React from 'react';
import { Decorations } from '../decorative/decorations';

export default function PageHeader() {
    return (
        <header className="relative w-full bg-bg-dark py-6 flex justify-between items-center px-8">
            <div className="flex items-center gap-4">
                <img
                    src="/Images/ract-logo.png" // Update to the correct logo path
                    alt="AI Roadmap Tree Logo"
                    className="h-10"
                />
                <h1 className="text-white text-2xl font-poppins font-bold">
                    AI Roadmap Tree
                </h1>
            </div>
            <nav className="flex gap-6">
                {/* Add navigation links if applicable */}
                <a href="#" className="text-white hover:underline">
                    Home
                </a>
                <a href="#" className="text-white hover:underline">
                    About
                </a>
            </nav>
            <Decorations />
        </header>
    );
}