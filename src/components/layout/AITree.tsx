// src/components/layout/AITree.tsx
import React, { useState, ReactElement } from 'react';
import { NodeTree } from '../nodes/NodeTree';
import { TreeNode, NodeType } from '../../types/tree';
import { AddNodeModal } from '../nodes/AddNodeModal';
import { NodeModal } from '../modals/NodeModal';
import { treeData as initialTreeData } from '../../data/treeData';
import { calculateNodePosition } from '../../utils/treePositionUtils';
import ReactDOM from 'react-dom';

interface AITreeProps {
    startY?: number;
    showButtons?: boolean;
}

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
        console.log('Opening modal for node:', node);
        setSelectedNode(node);
    };

    const handleAddNode = (parentId: string, nodeType: SelectableNodeType): void => {
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

    const renderModals = () => {
        const modalRoot = document.getElementById('modal-root');
        if (!modalRoot) return null;

        return ReactDOM.createPortal(
            <>
                {selectedNode && (
                    <NodeModal
                        node={selectedNode}
                        onClose={() => {
                            console.log('Closing modal');
                            setSelectedNode(null);
                        }}
                    />
                )}
                {isAddModalOpen && (
                    <AddNodeModal
                        isOpen={isAddModalOpen}
                        onClose={() => setIsAddModalOpen(false)}
                        onAdd={handleNodeAdd}
                        parentId={selectedParentId}
                        nodeType={selectedNodeType}
                    />
                )}
            </>,
            modalRoot
        );
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
            {renderModals()}
        </>
    );
};

export default AITree;