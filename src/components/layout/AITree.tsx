import React, { useState, ReactElement } from 'react';
import { NodeTree } from '../nodes/NodeTree';
import { TreeNode } from '../../types/tree';
import { AddNodeModal } from '../nodes/AddNodeModal';
import { NodeModal } from '../modals/NodeModal';
import { treeData as initialTreeData } from '../../data/treeData';
import { calculateNodePosition } from '../../utils/treePositionUtils';

interface AITreeProps {
    startY?: number;
    showButtons?: boolean;
}

const AITree = ({ startY = 800, showButtons = false }: AITreeProps): ReactElement => {
    const [treeData, setTreeData] = useState<TreeNode[]>(initialTreeData);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedParentId, setSelectedParentId] = useState<string>('');
    const [selectedNodeType, setSelectedNodeType] = useState<'sub' | 'sub2'>('sub');
    const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

    const getNodePos = (node: TreeNode, index: number) => {
        return calculateNodePosition(node, index, treeData, { startY });
    };

    const handleNodeClick = (node: TreeNode) => {
        setSelectedNode(node);
    };

    const handleAddNode = (parentId: string, nodeType: 'sub' | 'sub2'): void => {
        setSelectedParentId(parentId);
        setSelectedNodeType(nodeType);
        setIsAddModalOpen(true);
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