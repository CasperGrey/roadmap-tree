import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreeNode, NodeType } from '../../types/tree';
import { toTitleCase } from '../../utils/textUtils';

interface AddNodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (nodeData: Omit<TreeNode, 'id' | 'children'>) => void;
    parentId: string;
    nodeType: Extract<NodeType, 'sub' | 'sub2'>;
}

export function AddNodeModal({
                                 isOpen,
                                 onClose,
                                 onAdd,
                                 parentId,
                                 nodeType
                             }: AddNodeModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('circle');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (!title.trim()) {
                throw new Error('Title is required');
            }

            onAdd({
                title: title.trim(),
                description: description.trim(),
                icon,
                type: nodeType,
                parentId
            });

            // Reset form
            setTitle('');
            setDescription('');
            setIcon('circle');
            setError(null);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                                 w-full max-w-md bg-[#1C3559] rounded-lg shadow-xl z-50
                                 border-2 border-white/20"
                    >
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-white mb-4">
                                Add New {nodeType === 'sub' ? 'Sub' : 'Sub-2'} Node
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <div className="p-3 bg-red-500/20 border border-red-500 rounded text-red-100 text-sm">
                                        {error}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-white mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#204B87] text-white rounded
                                                 border border-white/20 focus:outline-none focus:border-white"
                                        placeholder="Enter node title"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#204B87] text-white rounded
                                                 border border-white/20 focus:outline-none focus:border-white
                                                 min-h-[100px]"
                                        placeholder="Enter node description"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white mb-1">
                                        Icon
                                    </label>
                                    <input
                                        type="text"
                                        value={icon}
                                        onChange={(e) => setIcon(e.target.value)}
                                        className="w-full px-3 py-2 bg-[#204B87] text-white rounded
                                                 border border-white/20 focus:outline-none focus:border-white"
                                        placeholder="Enter icon name or URL"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 text-white hover:bg-white/10 rounded transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-[#204B87] hover:bg-[#2b5ca6] text-white
                                                 rounded transition-colors border border-white/20"
                                    >
                                        Add Node
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}