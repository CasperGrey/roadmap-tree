// src/components/modals/NodeModal.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreeNode } from '../../types/tree';

interface NodeModalProps {
    node: TreeNode | null;
    onClose: () => void;
}

export function NodeModal({ node, onClose }: NodeModalProps) {
    if (!node) return null;

    const toTitleCase = (str: string) => {
        return str.split(' ').map(word => {
            if (word.toUpperCase() === 'AI' ||
                word.toUpperCase() === 'PR' ||
                word.toUpperCase() === 'MS' ||
                word.toUpperCase() === 'LMS' ||
                word.toUpperCase() === 'POC') {
                return word.toUpperCase();
            }
            if (word === '&') return '&';
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                onClick={e => e.stopPropagation()}
                className="bg-[#1C3559] rounded-lg w-full max-w-md mx-4 border-2 border-white shadow-lg overflow-hidden"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/20">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-[#204B87] rounded-full">
                            {node.icon.startsWith('http') || node.icon.startsWith('/') ? (
                                <img
                                    src={node.icon}
                                    alt={node.title}
                                    className="w-6 h-6 object-contain filter invert"
                                />
                            ) : (
                                <i className={`fas fa-${node.icon} text-white`} />
                            )}
                        </div>
                        <h2 className="text-xl font-bold text-white">
                            {toTitleCase(node.title)}
                        </h2>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="text-white/90 space-y-4">
                        <p className="leading-relaxed">
                            {node.description || 'No description available.'}
                        </p>
                        <div className="text-sm text-white/70">
                            <p>Type: {node.type.charAt(0).toUpperCase() + node.type.slice(1)}</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/20">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 bg-[#204B87] hover:bg-[#2b5ca6] text-white
                                 rounded transition-colors border border-white/20"
                    >
                        Close
                    </button>
                </div>
            </motion.div>
        </div>
    );
}