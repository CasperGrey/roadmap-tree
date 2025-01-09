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

    return (
        <AnimatePresence>
            <div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="bg-[#1C3559] rounded-lg p-6 max-w-lg w-full mx-4 border-2 border-white"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex items-center gap-4 mb-4">
                        {node.icon.startsWith('/') || node.icon.startsWith('http') ? (
                            <img
                                src={node.icon}
                                alt={node.title}
                                className="w-8 h-8 filter invert"
                            />
                        ) : (
                            <i className={`fas fa-${node.icon} text-2xl text-white`}></i>
                        )}
                        <h2 className="text-xl font-bold text-white">{node.title}</h2>
                    </div>

                    <p className="text-white/90 text-base leading-relaxed">
                        {node.description || 'No description available.'}
                    </p>

                    <button
                        onClick={onClose}
                        className="mt-6 px-4 py-2 bg-[#204B87] hover:bg-[#2b5ca6] text-white rounded-md
                                 transition-colors border border-white/20 w-full"
                    >
                        Close
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}