// src/components/nodes/AddNodeModal.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NewNodeData, SwimLane } from '../../types/tree';
import { createPortal } from 'react-dom';

interface AddNodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    parentId: string;
    selectedLane: SwimLane;
    onAdd: (nodeData: NewNodeData) => void;
}

export function AddNodeModal({
                                 isOpen,
                                 onClose,
                                 onAdd,
                                 parentId,
                                 selectedLane,
                             }: AddNodeModalProps) {
    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('Title is required');
            return;
        }

        if (!icon.trim()) {
            setError('Icon URL is required');
            return;
        }

        const newNode: NewNodeData = {
            type: 'sub',
            title: title.trim(),
            icon: icon.trim(),
            swimLane: selectedLane,
            parentId
        };

        onAdd(newNode);

        // Reset form
        setTitle('');
        setIcon('');
        setError(null);
    };

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 9999
                    }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-node-blue rounded-lg p-6 max-w-md w-full mx-4"
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold text-white mb-6">Add New Node</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Node Title
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-3 py-2 bg-white/10 rounded-md text-white
                                             border border-white/20 focus:border-white/50
                                             focus:outline-none focus:ring-1 focus:ring-white/50
                                             placeholder-white/50"
                                    placeholder="Enter node title"
                                />
                            </div>

                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Font Awesome Icon URL
                                </label>
                                <input
                                    type="text"
                                    value={icon}
                                    onChange={(e) => setIcon(e.target.value)}
                                    className="w-full px-3 py-2 bg-white/10 rounded-md text-white
                                             border border-white/20 focus:border-white/50
                                             focus:outline-none focus:ring-1 focus:ring-white/50
                                             placeholder-white/50"
                                    placeholder="Paste Font Awesome icon URL"
                                />
                            </div>

                            {error && (
                                <div className="text-red-400 text-sm mt-2">
                                    {error}
                                </div>
                            )}

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20
                                             text-white rounded-md transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600
                                             text-white rounded-md transition-colors"
                                >
                                    Add Node
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
}