// src/components/layout/AITree.tsx
import React, { useState, ReactElement } from 'react';
import { NodeTree } from '../nodes/NodeTree';
import { TreeNode } from '../../types/tree';
import { AddNodeModal } from '../nodes/AddNodeModal';
import { treeData as initialTreeData } from '../../data/treeData';
import { ZoomableViewport } from './ZoomableViewport';

const AITree = (): ReactElement => {
    const [treeData, setTreeData] = useState<TreeNode[]>(initialTreeData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedParentId, setSelectedParentId] = useState<string>('');
    const [selectedNodeType, setSelectedNodeType] = useState<'sub' | 'sub2'>('sub');

    const getNodePosition = (node: TreeNode, index: number): { x: number; y: number } => {
        // Calculate base spacing
        const totalWidth = 3432;
        const parentCount = treeData.length;
        const parentSpacing = totalWidth / (parentCount + 1);

        let x = 0;
        let y = 800;

        if (node.type === 'parent') {
            // Position parent nodes evenly across the width
            x = parentSpacing * (index + 1);
            y = 800;
        } else {
            // Find the parent node
            const parentNode = treeData.find(parent =>
                parent.id === node.parentId ||
                parent.children?.some(child => child.id === node.parentId || child.id === node.id)
            );

            if (parentNode) {
                const parentIndex = treeData.indexOf(parentNode);
                const parentX = parentSpacing * (parentIndex + 1);

                if (node.type === 'sub') {
                    // Find index among siblings
                    const siblings = parentNode.children || [];
                    const siblingIndex = siblings.findIndex(child => child.id === node.id);
                    const siblingCount = siblings.length;
                    const subSpacing = parentSpacing / (siblingCount + 1);

                    x = parentX - (parentSpacing / 2) + (subSpacing * (siblingIndex + 1));
                    y = 1000;
                } else if (node.type === 'sub2') {
                    // Find parent sub node
                    const parentSub = parentNode.children?.find(child =>
                        child.id === node.parentId
                    );

                    if (parentSub) {
                        const subSiblings = parentNode.children || [];
                        const subIndex = subSiblings.indexOf(parentSub);
                        const subX = parentX - (parentSpacing / 2) +
                            (parentSpacing / (subSiblings.length + 1) * (subIndex + 1));

                        // Position sub2 nodes at an angle from their parent sub node
                        const siblingIndex = parentSub.children?.indexOf(node) ?? 0;
                        const siblingCount = parentSub.children?.length ?? 1;
                        const angleSpacing = 45 / (siblingCount + 1);
                        const angle = -22.5 + (angleSpacing * (siblingIndex + 1));
                        const radius = 200;

                        x = subX + (radius * Math.cos((angle * Math.PI) / 180));
                        y = 1000 + (radius * Math.sin((angle * Math.PI) / 180));
                    }
                }
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
        <ZoomableViewport initialHeight={2000}>
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
        </ZoomableViewport>
    );
};

export default AITree;