// src/components/layout/AITree.tsx
import React, { useState, ReactElement } from 'react';
import { NodeTree } from '../nodes/NodeTree';
import { TreeNode } from '../../types/tree';
import { AddNodeModal } from '../nodes/AddNodeModal';
import { treeData as initialTreeData } from '../../data/treeData';
import { calculateNodePosition } from '../../utils/treePositionUtils';
import { addNodeToTree, createNewNode } from '../../utils/treeManipulationUtils';

interface AITreeProps {
    startY?: number;
}

const AITree = ({ startY = 690 }: AITreeProps): ReactElement => {
    const [treeData, setTreeData] = useState<TreeNode[]>(initialTreeData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedParentId, setSelectedParentId] = useState<string>('');
    const [selectedNodeType, setSelectedNodeType] = useState<'sub' | 'sub2'>('sub');

    const handleAddNode = (parentId: string, nodeType: 'sub' | 'sub2'): void => {
        setSelectedParentId(parentId);
        setSelectedNodeType(nodeType);
        setIsModalOpen(true);
    };

    const handleNodeAdd = (nodeData: Omit<TreeNode, 'id' | 'children'>) => {
        const newNode = createNewNode(nodeData);
        setTreeData(currentTreeData => addNodeToTree(currentTreeData, nodeData.parentId, newNode));
        setIsModalOpen(false);
    };

    const getNodePos = (node: TreeNode, index: number) =>
        calculateNodePosition(node, index, treeData, { startY });

    return (
        <g>
            {treeData.map((node, index) => (
                <NodeTree
                    key={node.id}
                    node={node}
                    position={getNodePos(node, index)}
                    index={index}
                    getNodePosition={getNodePos}
                    onAddClick={handleAddNode}
                />
            ))}
            {isModalOpen && (
                <AddNodeModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAdd={handleNodeAdd}
                    parentId={selectedParentId}
                    nodeType={selectedNodeType}
                />
            )}
        </g>
    );
};

export default AITree;