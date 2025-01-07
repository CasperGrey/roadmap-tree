// Updated PageHeader.tsx
import React from 'react';
import { Decorations } from '../decorative/decorations';

export default function PageHeader() {
    return (
        <header className="relative w-full bg-bg-dark py-6 px-10">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img
                        src="/assets/logo.svg" // Update to the correct logo path
                        alt="AI Roadmap Tree Logo"
                        className="h-12"
                    />
                    <h1 className="text-white text-3xl font-poppins font-bold">
                        AI Roadmap Tree
                    </h1>
                </div>
                <nav className="flex gap-8">
                    <a href="#" className="text-white text-lg hover:underline">
                        Home
                    </a>
                    <a href="#" className="text-white text-lg hover:underline">
                        About
                    </a>
                </nav>
            </div>
            <Decorations />
        </header>
    );
}