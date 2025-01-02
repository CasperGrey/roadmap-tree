// src/components/nodes/AddNodeModal.tsx
import React from 'react';
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
                             }: AddNodeModalProps) {
    if (!isOpen) return null;

    // Simple modal content for testing visibility
    const modalContent = (
        <div
            className="fixed inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}
        >
            <div
                className="bg-node-blue p-6 rounded-lg"
                style={{ minWidth: '300px' }}
            >
                <h2 className="text-white text-xl mb-4">Add New Node</h2>
                <div className="space-y-4">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Close Modal
                    </button>
                </div>
            </div>
        </div>
    );

    // Try direct render first without portal
    return modalContent;

    // If the above works, we can switch to portal:
    // return createPortal(modalContent, document.body);
}