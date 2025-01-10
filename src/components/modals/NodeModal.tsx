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
        <div
            className="fixed inset-0 z-50 overflow-auto bg-black/50 flex items-center justify-center"
            onClick={onClose}
            style={{ pointerEvents: 'auto' }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={e => e.stopPropagation()}
                className="relative bg-[#1C3559] rounded-lg p-8 m-4 max-w-lg w-full border-2 border-white shadow-lg"
            >
                {/* Header with icon and title */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 flex items-center justify-center">
                        {node.icon.startsWith('http') || node.icon.startsWith('/') ? (
                            <img
                                src={node.icon}
                                alt={node.title}
                                className="w-full h-full object-contain filter invert"
                            />
                        ) : (
                            <i className={`fas fa-${node.icon} text-3xl text-white`} />
                        )}
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                        {node.type === 'parent'
                            ? node.title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
                            : node.title}
                    </h2>
                </div>

                {/* Description */}
                <div className="mb-8">
                    <p className="text-white/90 text-lg leading-relaxed">
                        {node.description || 'No description available.'}
                    </p>
                </div>

                {/* Additional Info */}
                <div className="mb-8 text-white/70">
                    <p className="text-sm mb-1">Type: {node.type.charAt(0).toUpperCase() + node.type.slice(1)}</p>
                    {node.parentId && node.parentId !== 'root' && (
                        <p className="text-sm">Parent: {node.parentId}</p>
                    )}
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="w-full px-6 py-3 bg-[#204B87] hover:bg-[#2b5ca6] text-white
                             rounded-md transition-colors border border-white/20
                             text-lg font-medium"
                >
                    Close
                </button>
            </motion.div>
        </div>
    );
}