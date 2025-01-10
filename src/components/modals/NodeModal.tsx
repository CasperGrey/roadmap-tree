// src/components/modals/NodeModal.tsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreeNode } from '../../types/tree';

interface NodeModalProps {
    node: TreeNode | null;
    onClose: () => void;
}

export function NodeModal({ node, onClose }: NodeModalProps) {
    useEffect(() => {
        if (node) {
            console.log('Modal mounted with node:', node);
        }
    }, [node]);

    if (!node) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
            style={{ pointerEvents: 'auto' }}
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
                    {node.icon.startsWith('http') || node.icon.startsWith('/') ? (
                        <img
                            src={node.icon}
                            alt={node.title}
                            className="w-8 h-8 filter invert"
                        />
                    ) : (
                        <i className={`fas fa-${node.icon} text-2xl text-white`} />
                    )}
                    <h2 className="text-xl font-bold text-white">
                        {node.type === 'parent'
                            ? node.title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
                            : node.title}
                    </h2>
                </div>

                <p className="text-white/90 text-base leading-relaxed mb-4">
                    {node.description || 'No description available.'}
                </p>

                <div className="text-white/70 text-sm mb-4">
                    <p>Type: {node.type.charAt(0).toUpperCase() + node.type.slice(1)}</p>
                    {node.parentId && <p>Parent ID: {node.parentId}</p>}
                </div>

                <button
                    onClick={onClose}
                    className="w-full px-4 py-2 bg-[#204B87] hover:bg-[#2b5ca6] text-white
                             rounded-md transition-colors border border-white/20"
                >
                    Close
                </button>
            </motion.div>
        </div>
    );
}