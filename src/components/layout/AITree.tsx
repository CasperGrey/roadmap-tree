import React, { useEffect, useState, ReactElement } from 'react';
import { NodeTree } from '../nodes/NodeTree';
import { TreeNode } from '../../types/tree';
import { AddNodeModal } from '../nodes/AddNodeModal';
import { treeData as initialTreeData } from '../../data/treeData';

const AITree = (): ReactElement => {
    const [treeData, setTreeData] = useState<TreeNode[]>(initialTreeData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedParentId, setSelectedParentId] = useState<string>('');
    const [selectedNodeType, setSelectedNodeType] = useState<'sub' | 'sub2'>('sub');

    const getNodePosition = (node: TreeNode, index: number): { x: number; y: number } => {
        const parentCount = treeData.length;
        const horizontalSpacing = 3432 / (parentCount + 1);

        const parentIndex = treeData.findIndex(parent =>
            parent.id === node.id ||
            parent.children?.some(child =>
                child.id === node.id ||
                child.children?.some(subChild => subChild.id === node.id)
            )
        );

        let x = (parentIndex + 1) * horizontalSpacing;
        let y = 800;

        if (node.type === 'sub') {
            y = 1000;
            const parent = treeData[parentIndex];
            const childIndex = parent.children?.findIndex(child => child.id === node.id) ?? 0;
            const childCount = parent.children?.length ?? 1;
            const childSpacing = horizontalSpacing / (childCount + 1);
            x = (parentIndex * horizontalSpacing) + ((childIndex + 1) * childSpacing);
        } else if (node.type === 'sub2') {
            y = 1200;
            const parentSub = treeData[parentIndex]?.children?.find(child =>
                child.children?.some(subChild => subChild.id === node.id)
            );
            if (parentSub) {
                const subChildIndex = parentSub.children?.findIndex(child => child.id === node.id) ?? 0;
                const subChildCount = parentSub.children?.length ?? 1;
                const subChildSpacing = horizontalSpacing / (subChildCount + 1);
                x += subChildSpacing * (subChildIndex + 1) - (horizontalSpacing / 4);
            }
        }

        return { x, y };
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
        <g transform="translate(0, 690)">
            {treeData.map((node, index) => (
                <NodeTree
                    key={node.id}
                    node={node}
                    position={getNodePosition(node, index)}
                    index={index}
                    getNodePosition={getNodePosition}
                    onAddClick={handleAddNode}
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