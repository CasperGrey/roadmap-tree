// src/components/nodes/AddNodeModal.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NewNodeData, SwimLane } from '../../types/tree';

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

    console.log('Modal rendered with props:', { isOpen, parentId, selectedLane });

    const handleSubmit = (e: React.FormEvent) => {
        console.log('Submit clicked');
        e.preventDefault();

        if (!title.trim()) {
            setError('Title is required');
            console.log('Title validation failed');
            return;
        }

        if (!icon.trim()) {
            setError('Icon URL is required');
            console.log('Icon validation failed');
            return;
        }

        const newNode: NewNodeData = {
            type: 'sub',
            title: title.trim(),
            icon: icon.trim(),
            swimLane: selectedLane,
            parentId
        };

        console.log('Modal submitting:', newNode);
        onAdd(newNode);

        // Reset form
        setTitle('');
        setIcon('');
        setError(null);
    };

    return (
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
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999
                    }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative bg-node-blue rounded-lg p-6 w-full max-w-md mx-4"
                        style={{ zIndex: 10000 }}
                        onClick={e => e.stopPropagation()}
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
                                    onChange={(e) => {
                                        console.log('Title changed:', e.target.value);
                                        setTitle(e.target.value);
                                    }}
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
                                    onChange={(e) => {
                                        console.log('Icon changed:', e.target.value);
                                        setIcon(e.target.value);
                                    }}
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
                                    onClick={() => {
                                        console.log('Cancel clicked');
                                        onClose();
                                    }}
                                    className="px-4 py-2 text-white bg-black bg-opacity-50 hover:bg-opacity-70
                                             rounded-md transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={() => console.log('Submit button clicked')}
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