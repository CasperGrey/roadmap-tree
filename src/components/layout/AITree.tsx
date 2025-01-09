// src/components/layout/AITree.tsx
import React, { useState, ReactElement } from 'react';
import { NodeTree } from '../nodes/NodeTree';
import { TreeNode } from '../../types/tree';
import { AddNodeModal } from '../nodes/AddNodeModal';
import { treeData as initialTreeData } from '../../data/treeData';
import { calculateNodePosition } from '../../utils/treePositionUtils';

interface AITreeProps {
    startY?: number;
    showButtons?: boolean;
}

const AITree = ({ startY = 800, showButtons = false }: AITreeProps): ReactElement => {
    const [treeData, setTreeData] = useState<TreeNode[]>(initialTreeData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedParentId, setSelectedParentId] = useState<string>('');
    const [selectedNodeType, setSelectedNodeType] = useState<'sub' | 'sub2'>('sub');

    const getNodePos = (node: TreeNode, index: number) => {
        return calculateNodePosition(node, index, treeData, { startY });
    };

    const handleAddNode = (parentId: string, nodeType: 'sub' | 'sub2'): void => {
        setSelectedParentId(parentId);
        setSelectedNodeType(nodeType);
        setIsModalOpen(true);
    };

    const handleNodeAdd = (nodeData: Omit<TreeNode, 'id' | 'children'>) => {
        const newNode: TreeNode = {
            ...nodeData,
            id: `node-${Date.now()}`,
            children: []
        };

        setTreeData((currentTreeData: TreeNode[]): TreeNode[] => {
            const updateNodes = (nodes: TreeNode[]): TreeNode[] => {
                return nodes.map((node: TreeNode): TreeNode => {
                    if (node.id === nodeData.parentId) {
                        return {
                            ...node,
                            children: [...(node.children || []), newNode]
                        };
                    }
                    if (node.children) {
                        return {
                            ...node,
                            children: updateNodes(node.children)
                        };
                    }
                    return node;
                });
            };
            return updateNodes(currentTreeData);
        });

        setIsModalOpen(false);
    };

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
                    showButtons={showButtons}
                />
            ))}
            <AddNodeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleNodeAdd}
                parentId={selectedParentId}
                nodeType={selectedNodeType}
            />
        </g>
    );
};

export default AITree;