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

    const handleAddNode = (newNode: TreeNode) => {
        setTreeData([...treeData, newNode]);
    };

    const handleNodeClick = (nodeId: number) => {
        console.log(`Node ${nodeId} clicked`);
    };

    return (
        <div className="flex flex-col items-center w-full bg-dark">
            <div className="w-full">
                <PageHeader />
            </div>
            <div className="w-full flex justify-center mt-[-30px]">
                <AITree
                    data={treeData}
                    onAddNode={handleAddNode}
                    onNodeAdd={handleNodeClick}
                />
            </div>
        </div>
    );
}
