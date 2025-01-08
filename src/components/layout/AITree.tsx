// src/components/layout/AITree.tsx
import React, { useState, ReactElement } from 'react';
import { NodeTree } from '../nodes/NodeTree';
import { TreeNode } from '../../types/tree';
import { AddNodeModal } from '../nodes/AddNodeModal';
import { treeData as initialTreeData } from '../../data/treeData';

interface AITreeProps {
    startY?: number;
}

const AITree = ({ startY = 690 }: AITreeProps): ReactElement => {
    const [treeData, setTreeData] = useState<TreeNode[]>(initialTreeData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedParentId, setSelectedParentId] = useState<string>('');
    const [selectedNodeType, setSelectedNodeType] = useState<'sub' | 'sub2'>('sub');

    // Get parent nodes for spacing calculations
    const getParentNodes = () => treeData.filter(node => node.type === 'parent');

    const getNodePosition = (node: TreeNode, index: number): { x: number; y: number } => {
        const totalWidth = 3432;
        const margin = 200; // Margin from edges
        const usableWidth = totalWidth - (margin * 2);
        const parentNodes = getParentNodes();
        const parentCount = parentNodes.length;
        const parentSpacing = usableWidth / (parentCount - 1); // Space between parent nodes

        if (node.type === 'parent') {
            // Position parent nodes evenly across the top
            const parentIndex = parentNodes.findIndex(p => p.id === node.id);
            return {
                x: margin + (parentIndex * parentSpacing),
                y: startY + 110 // Fixed Y for parent nodes
            };
        }

        // Find this node's parent
        const parentNode = treeData.find(n =>
            n.id === node.parentId ||
            n.children?.some(c => c.id === node.parentId || c.id === node.id)
        );

        if (!parentNode) return { x: 0, y: 0 };

        // Get parent's position
        const parentIndex = parentNodes.findIndex(p => p.id === parentNode.id);
        const parentX = margin + (parentIndex * parentSpacing);

        if (node.type === 'sub') {
            // Position sub nodes vertically below their parent
            const siblings = parentNode.children || [];
            const siblingIndex = siblings.findIndex(s => s.id === node.id);
            const siblingCount = siblings.length;
            const subSpacing = parentSpacing / (siblingCount + 1);

            return {
                x: parentX - (parentSpacing / 2) + (subSpacing * (siblingIndex + 1)),
                y: startY + 310 // Fixed Y for sub nodes
            };
        }

        if (node.type === 'sub2') {
            // Find the immediate parent (sub node)
            const subParent = parentNode.children?.find(c => c.id === node.parentId);
            if (!subParent) return { x: 0, y: 0 };

            const subParentIndex = parentNode.children?.indexOf(subParent) || 0;
            const subParentCount = parentNode.children?.length || 1;
            const subSpacing = parentSpacing / (subParentCount + 1);
            const subParentX = parentX - (parentSpacing / 2) + (subSpacing * (subParentIndex + 1));

            // Position sub2 nodes diagonally to the right of their parent
            const angleInRadians = Math.PI / 6; // 30 degrees
            const diagonalDistance = 150; // Length of diagonal line

            return {
                x: subParentX + (diagonalDistance * Math.cos(angleInRadians)),
                y: startY + 310 + (diagonalDistance * Math.sin(angleInRadians)) // Start from sub node's Y
            };
        }

        return { x: 0, y: 0 };
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
                    position={getNodePosition(node, index)}
                    index={index}
                    getNodePosition={getNodePosition}
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