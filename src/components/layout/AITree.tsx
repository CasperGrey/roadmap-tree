// src/components/layout/AITree.tsx
import React, { useState, ReactElement } from 'react';
import { NodeTree } from '../nodes/NodeTree';
import { TreeNode, NodeType } from '../../types/tree';
import { SidePanel } from '../panels/SidePanel';
import { AddNodeModal } from '../nodes/AddNodeModal';
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
    const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedParentId, setSelectedParentId] = useState<string>('');
    const [selectedNodeType, setSelectedNodeType] = useState<SelectableNodeType>('sub');

    const getNodePos = (node: TreeNode, index: number) => {
        return calculateNodePosition(node, index, treeData, { startY });
    };

    const handleNodeClick = (node: TreeNode) => {
        console.log('Opening panel for node:', node);
        setSelectedNode(node);
    };

    const handleAddClick = (parentId: string, nodeType: SelectableNodeType) => {
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

    const panelRoot = document.getElementById('panel-root');
    const modalRoot = document.getElementById('modal-root');

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
                        onNodeClick={handleNodeClick}
                        onAddClick={handleAddClick}
                        showButtons={showButtons}
                    />
                ))}
            </g>

            {/* Side Panel for Node Details */}
            {selectedNode && panelRoot && ReactDOM.createPortal(
                <SidePanel
                    node={selectedNode}
                    onClose={() => setSelectedNode(null)}
                />,
                panelRoot
            )}

            {/* Modal for Adding Nodes */}
            {isAddModalOpen && modalRoot && ReactDOM.createPortal(
                <AddNodeModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onAdd={handleNodeAdd}
                    parentId={selectedParentId}
                    nodeType={selectedNodeType}
                />,
                modalRoot
            )}
        </>
    );
};

export default AITree;