// src/App.tsx
import React, { useState } from 'react';
import AITree from './components/layout/AITree';
import PageHeader from './components/header/PageHeader';
import { treeData as initialTreeData } from './data/treeData';
import { TreeNode, NewNodeData } from './types/tree';

export default function App() {
    const [treeData, setTreeData] = useState(initialTreeData);

    const handleAddNode = (nodeData: NewNodeData) => {
        console.log('App receiving:', nodeData);
        setTreeData(currentData => {
            return currentData.map(node => {
                if (node.id === nodeData.parentId) {
                    const existingChildren = node.children || [];
                    const existingSub = existingChildren.find(child => child.type === 'sub');

                    // Create new node
                    const newNode: TreeNode = {
                        id: nodeData.title
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)/g, ''),
                        ...nodeData,
                        children: []
                    };

                    if (existingSub) {
                        // Move existing sub node under new node
                        newNode.children = [existingSub];
                        return {
                            ...node,
                            children: [
                                ...existingChildren.filter(child => child.id !== existingSub.id),
                                newNode
                            ]
                        };
                    }

                    // Add new node to children array
                    return {
                        ...node,
                        children: [...existingChildren, newNode]
                    };
                }
                return node;
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