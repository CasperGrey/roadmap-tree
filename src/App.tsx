// src/App.tsx
import React, { useState } from 'react';
import AITree from './components/layout/AITree';
import PageHeader from './components/header/PageHeader';
import { treeData as initialTreeData } from './data/treeData';
import { TreeNode, NewNodeData } from './types/tree';

export default function App() {
    const [treeData, setTreeData] = useState(initialTreeData);

    // Recursive function to find and update a node in the tree
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

    const findNode = (nodeId: string, nodes: TreeNode[]): TreeNode | null => {
        for (const node of nodes) {
            if (node.id === nodeId) return node;
            if (node.children?.length) {
                const found = findNode(nodeId, node.children);
                if (found) return found;
            }
        }
        return null;
    };

    const handleAddNode = (nodeData: NewNodeData) => {
        setTreeData(currentData => {
            // Find the parent node
            const parentNode = findNode(nodeData.parentId, currentData);
            if (!parentNode) return currentData;

            // Create new node
            const newNode: TreeNode = {
                id: nodeData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                ...nodeData,
                children: []
            };

            // Update the parent node with the new child
            return updateTreeNode(currentData, nodeData.parentId, (parent) => {
                const updatedChildren = [...(parent.children || [])];

                if (nodeData.type === 'sub') {
                    // If adding a sub node and there's an existing sub, make it a child of the new node
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

                // Otherwise, just add the new node as a child
                return {
                    ...parent,
                    children: [...(parent.children || []), newNode]
                };
            });
        });
    };

    return (
        <div className="absolute w-full h-full bg-bg-dark">
            <PageHeader />
            <AITree
                data={treeData}
                onAddNode={handleAddNode}
            />
        </div>
    );
}