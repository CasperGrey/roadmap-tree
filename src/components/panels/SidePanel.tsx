// src/components/panels/SidePanel.tsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreeNode } from '../../types/tree';

interface SidePanelProps {
    node: TreeNode | null;
    onClose: () => void;
}

import { useClickOutside } from '@mantine/hooks';

export function SidePanel({ node, onClose }: SidePanelProps) {
    const ref = useClickOutside(onClose);
    
    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const findParentChain = (nodeId: string, treeData: TreeNode[]): TreeNode[] => {
        const findInNodes = (nodes: TreeNode[], chain: TreeNode[] = []): TreeNode[] => {
            for (const node of nodes) {
                if (node.id === nodeId) {
                    return [...chain, node];
                }
                if (node.children?.length) {
                    const result = findInNodes(node.children, [...chain, node]);
                    if (result.length) return result;
                }
            }
            return [];
        };
        return findInNodes(treeData);
    };

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
        <AnimatePresence>
            {node && (
                <>
                    {/* Backdrop for click-outside */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 z-40"
                    />

                    {/* Side Panel */}
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-96 bg-[#1C3559] border-l-2 border-white z-50 shadow-xl"
                    >
                        {/* Content Container */}
                        <div className="flex flex-col h-full">
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

                            {/* Main Content */}
                            <div className="flex-1 p-6 overflow-y-auto">
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
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}