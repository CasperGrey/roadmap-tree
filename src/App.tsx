import React, { useState } from 'react';
import PageHeader from './components/header/PageHeader';
import AITree from './components/layout/AITree';

interface TreeNode {
    id: number;
    label: string;
    children?: TreeNode[];
}

export default function App() {
    const [treeData, setTreeData] = useState<TreeNode[]>([
        { id: 1, label: 'Root Node', children: [] },
    ]);

    const handleAddNode = () => {
        const newNode: TreeNode = { id: treeData.length + 1, label: `Node ${treeData.length + 1}`, children: [] };
        setTreeData([...treeData, newNode]);
    };

    const handleNodeClick = (nodeId: number) => {
        console.log(`Node ${nodeId} clicked`);
    };

    return (
        <div className="flex flex-col items-center w-full bg-dark">
            {/* Header */}
            <div className="w-full">
                <PageHeader />
            </div>

            {/* Tree Section */}
            <div className="relative w-full flex justify-center mt-[-10px]">
                <AITree
                    data={treeData}
                    onAddNode={handleAddNode}
                    onNodeAdd={handleNodeClick}
                />
            </div>
        </div>
    );
}
