// src/App.tsx
import React, { useState } from 'react';
import AITree from './components/layout/AITree';
import PageHeader from './components/header/PageHeader';
import { treeData as initialTreeData } from './data/treeData';
import { TreeNode, SwimLane } from './types/tree';

interface AddNodeData {
    parentId: string;
    swimLane: SwimLane;
}

export default function App() {
    const [treeData, setTreeData] = useState(initialTreeData);

    const handleAddNode = ({ parentId, swimLane }: AddNodeData) => {
        setTreeData(currentData => {
            return currentData.map(node => {
                if (node.id === parentId) {
                    // Create new node
                    const newNode: TreeNode = {
                        id: crypto.randomUUID(),
                        type: 'sub',
                        title: 'New Node',
                        icon: '+',
                        swimLane,
                        parentId,
                    };

                    // Add to children array
                    return {
                        ...node,
                        children: [...(node.children || []), newNode]
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