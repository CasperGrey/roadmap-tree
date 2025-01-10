// src/components/nodes/AddNodeModal.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AddNodeModalProps, NewNodeData } from '../../types/tree';

export function AddNodeModal({
                                 isOpen,
                                 onClose,
                                 onAdd,
                                 parentId,
                                 nodeType
                             }: AddNodeModalProps) {
    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('Title is required');
            return;
        }

        if (!icon.trim()) {
            setError('Icon URL or name is required');
            return;
        }

        const newNode: NewNodeData = {
            type: nodeType,
            title: title.trim(),
            icon: icon.trim(),
            description: description.trim(),
            parentId
        };

        onAdd(newNode);
        setTitle('');
        setIcon('');
        setDescription('');
        setError(null);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        onClick={e => e.stopPropagation()}
                        className="bg-[#1C3559] rounded-lg p-6 max-w-md w-full mx-4 border-2 border-white"
                    >
                        <h2 className="text-xl font-bold text-white mb-6">
                            Add {nodeType === 'sub2' ? 'Sub-2' : 'Sub'} Node
                        </h2>

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
                                             focus:outline-none focus:ring-1 focus:ring-white/50"
                                    placeholder="Enter node title"
                                />
                            </div>

                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Icon Name or URL
                                </label>
                                <input
                                    type="text"
                                    value={icon}
                                    onChange={(e) => setIcon(e.target.value)}
                                    className="w-full px-3 py-2 bg-white/10 rounded-md text-white
                                             border border-white/20 focus:border-white/50
                                             focus:outline-none focus:ring-1 focus:ring-white/50"
                                    placeholder="e.g., 'brain', 'robot', or icon URL"
                                />
                            </div>

                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Description (optional)
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-3 py-2 bg-white/10 rounded-md text-white
                                             border border-white/20 focus:border-white/50
                                             focus:outline-none focus:ring-1 focus:ring-white/50
                                             min-h-[100px]"
                                    placeholder="Enter node description"
                                />
                            </div>

                            {error && (
                                <div className="text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="flex justify-end gap-3 mt-6">
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
}