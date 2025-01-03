// src/App.tsx
import React, { useState } from 'react';
import AITree from './components/layout/AITree';
import PageHeader from './components/header/PageHeader';
import { treeData as initialTreeData } from './data/treeData';
import { TreeNode, NewNodeData } from './types/tree';

export default function App() {
    const [treeData, setTreeData] = useState(initialTreeData);

    const findNodeAndUpdate = (nodes: TreeNode[], targetId: string, updateFn: (node: TreeNode) => TreeNode): TreeNode[] => {
        return nodes.map(node => {
            if (node.id === targetId) {
                return updateFn(node);
            }
            if (node.children) {
                return {
                    ...node,
                    children: findNodeAndUpdate(node.children, targetId, updateFn)
                };
            }
            return node;
        });
    };

    const handleAddNode = (nodeData: NewNodeData) => {
        setTreeData(currentData => {
            // First, find if the parent already has any sub nodes
            const parentNode = currentData.reduce((found: TreeNode | null, node) => {
                if (found) return found;
                if (node.id === nodeData.parentId) return node;
                if (node.children) {
                    return node.children.find(child => child.id === nodeData.parentId) || null;
                }
                return null;
            }, null);

            if (!parentNode) return currentData;

            const existingChildren = parentNode.children || [];
            const existingSub = existingChildren.find(child =>
                child.type === 'sub' && child.swimLane === nodeData.swimLane
            );

            // Create new node
            const newNode: TreeNode = {
                id: nodeData.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, ''),
                ...nodeData,
                children: []
            };

            // If there's an existing sub node, make it a child of the new node
            if (existingSub && nodeData.type === 'sub') {
                newNode.children = [existingSub];

                // Update the existing sub node's parentId
                const updatedExistingSub = {
                    ...existingSub,
                    parentId: newNode.id
                };

                // Remove the existing sub from its current parent and add the new node
                return findNodeAndUpdate(currentData, nodeData.parentId, (parent) => ({
                    ...parent,
                    children: [
                        ...parent.children?.filter(child => child.id !== existingSub.id) || [],
                        {
                            ...newNode,
                            children: [updatedExistingSub]
                        }
                    ]
                }));
            }

            // Otherwise, just add the new node
            return findNodeAndUpdate(currentData, nodeData.parentId, (parent) => ({
                ...parent,
                children: [...(parent.children || []), newNode]
            }));
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