// src/App.tsx
import React, { useState } from 'react';
import AITree from './components/layout/AITree';
import PageHeader from './components/header/PageHeader';
import { treeData as initialTreeData } from './data/treeData';
import { TreeNode, NewNodeData } from './types/tree';
import { AddNodeModal } from './components/nodes/AddNodeModal';
import { ModalPortal } from './components/modals/ModalPortal';

export default function App() {
    const [treeData, setTreeData] = useState(initialTreeData);
    const [activeParentId, setActiveParentId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeNodeType, setActiveNodeType] = useState<'sub' | 'sub2'>('sub');

    const findNode = (nodeId: string, nodes: TreeNode[]): TreeNode | null => {
        for (const node of nodes) {
            if (node.id === nodeId) return node;
            if (node.children) {
                const found = findNode(nodeId, node.children);
                if (found) return found;
            }
        }
        return null;
    };

    const updateTreeNode = (nodes: TreeNode[], nodeId: string, updateFn: (node: TreeNode) => TreeNode): TreeNode[] => {
        return nodes.map(node => {
            if (node.id === nodeId) {
                return updateFn(node);
            }
            if (node.children?.length) {
                return {
                    ...node,
                    children: updateTreeNode(node.children, nodeId, updateFn)
                };
            }
            return node;
        });
    };

    const handleAddNode = (nodeData: NewNodeData) => {
        setTreeData(currentData => {
            const parentNode = findNode(nodeData.parentId, currentData);
            if (!parentNode) return currentData;

            // Create new node
            const newNode: TreeNode = {
                id: nodeData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                ...nodeData,
                children: []
            };

            return updateTreeNode(currentData, nodeData.parentId, (parent) => {
                if (nodeData.type === 'sub') {
                    // If adding a sub node and there's an existing sub in the same lane
                    const existingSub = parent.children?.find(
                        child => child.type === 'sub' && child.swimLane === nodeData.swimLane
                    );

                    if (existingSub) {
                        newNode.children = [existingSub];
                        return {
                            ...parent,
                            children: [
                                ...parent.children?.filter(child => child !== existingSub) || [],
                                newNode
                            ]
                        };
                    }
                }

                // Add new node as child
                return {
                    ...parent,
                    children: [...(parent.children || []), newNode]
                };
            });
        });
    };

    const handleNodeAdd = (parentId: string, nodeType: 'sub' | 'sub2') => {
        setActiveParentId(parentId);
        setActiveNodeType(nodeType);
        setIsModalOpen(true);
    };

    return (
        <div className="absolute w-full h-full bg-bg-dark">
            <PageHeader />
            <AITree
                data={treeData}
                onAddNode={handleAddNode}
                onNodeAdd={handleNodeAdd}
            />

            <ModalPortal>
                <AddNodeModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setActiveParentId(null);
                    }}
                    parentId={activeParentId || ''}
                    selectedLane={'enable'}
                    onAdd={(nodeData: NewNodeData) => {
                        handleAddNode({
                            ...nodeData,
                            type: activeNodeType
                        });
                        setIsModalOpen(false);
                        setActiveParentId(null);
                    }}
                    nodeType={activeNodeType}
                />
            </ModalPortal>
        </div>
    );
}