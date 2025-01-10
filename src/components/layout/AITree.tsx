// src/components/layout/AITree.tsx
import React, { useState, ReactElement } from 'react';
import { NodeTree } from '../nodes/NodeTree';
import { TreeNode, NodeType } from '../../types/tree';
import { AddNodeModal } from '../nodes/AddNodeModal';
import { NodeModal } from '../modals/NodeModal';
import { treeData as initialTreeData } from '../../data/treeData';
import { calculateNodePosition } from '../../utils/treePositionUtils';

interface AITreeProps {
    startY?: number;
    showButtons?: boolean;
}

// Define a more specific type for node type selection
type SelectableNodeType = Extract<NodeType, 'sub' | 'sub2'>;

const AITree = ({ startY = 800, showButtons = false }: AITreeProps): ReactElement => {
    const [treeData, setTreeData] = useState<TreeNode[]>(initialTreeData);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedParentId, setSelectedParentId] = useState<string>('');
    const [selectedNodeType, setSelectedNodeType] = useState<SelectableNodeType>('sub');
    const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

    const getNodePos = (node: TreeNode, index: number) => {
        return calculateNodePosition(node, index, treeData, { startY });
    };

    const handleNodeClick = (node: TreeNode) => {
        console.log('Opening modal for node:', node.id);
        setSelectedNode(node);
    };

    const handleAddNode = (parentId: string, nodeType: SelectableNodeType): void => {
        setSelectedParentId(parentId);
        setSelectedNodeType(nodeType);
        setIsAddModalOpen(true);
    };

    const findLastSibling = (parentId: string, nodeType: SelectableNodeType): TreeNode | undefined => {
        const parent = treeData.find(node => node.id === parentId) ||
            treeData.flatMap(node => node.children || []).find(node => node.id === parentId);

        if (!parent?.children) return undefined;

        const siblings = parent.children.filter(node => node.type === nodeType);
        return siblings[siblings.length - 1];
    };

    const handleNodeAdd = (nodeData: Omit<TreeNode, 'id' | 'children'>) => {
        const lastSibling = findLastSibling(nodeData.parentId, nodeData.type as SelectableNodeType);

        const newNode: TreeNode = {
            ...nodeData,
            id: `node-${Date.now()}`,
            children: [],
            prevSiblingId: lastSibling?.id
        };

        // Update the previous last sibling's nextSiblingId
        if (lastSibling) {
            setTreeData(currentTreeData => {
                const updateNodeInTree = (nodes: TreeNode[]): TreeNode[] => {
                    return nodes.map(node => {
                        if (node.id === lastSibling.id) {
                            return { ...node, nextSiblingId: newNode.id };
                        }
                        if (node.children) {
                            return { ...node, children: updateNodeInTree(node.children) };
                        }
                        return node;
                    });
                };
                return updateNodeInTree(currentTreeData);
            });
        }

        setTreeData(currentTreeData => {
            const updateNodes = (nodes: TreeNode[]): TreeNode[] => {
                return nodes.map(node => {
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

        setIsAddModalOpen(false);
    };

    return (
        <>
            <g>
                {treeData.map((node, index) => (
                    <NodeTree
                        key={node.id}
                        node={node}
                        position={getNodePos(node, index)}
                        index={index}
                        getNodePosition={getNodePos}
                        onAddClick={handleAddNode}
                        onNodeClick={handleNodeClick}
                        showButtons={showButtons}
                    />
                ))}
            </g>
            <NodeModal
                node={selectedNode}
                onClose={() => setSelectedNode(null)}
            />
            <AddNodeModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleNodeAdd}
                parentId={selectedParentId}
                nodeType={selectedNodeType}
            />
        </>
    );
};

export default AITree;