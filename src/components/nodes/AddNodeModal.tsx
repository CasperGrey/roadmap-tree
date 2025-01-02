// src/components/nodes/AddNodeModal.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AddNodeModalProps } from '../../types/tree';

export function AddNodeModal({
                                 isOpen,
                                 onClose,
                                 onAdd,
                                 parentId,
                                 selectedLane,
                                 existingNodes = []
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

        // Generate clean ID from title
        const cleanId = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        onAdd({
            type: 'sub',
            title: title.trim(),
            icon: icon.trim(),
            swimLane: selectedLane,
            parentId
        });

        onClose();

        // Reset form
        setTitle('');
        setIcon('');
        setError(null);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-node-blue rounded-lg p-6 w-full max-w-md"
                    >
                        <h2 className="text-xl font-bold text-white mb-4">Add New Node</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Node Title
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-3 py-2 bg-white bg-opacity-10 rounded-md text-white
                                             border border-white border-opacity-20 focus:border-opacity-50
                                             focus:outline-none"
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
                                    className="w-full px-3 py-2 bg-white bg-opacity-10 rounded-md text-white
                                             border border-white border-opacity-20 focus:border-opacity-50
                                             focus:outline-none"
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
                                    className="px-4 py-2 text-white bg-opacity-50 hover:bg-opacity-70
                                             bg-white rounded-md transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md
                                             hover:bg-blue-600 transition-colors"
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
}