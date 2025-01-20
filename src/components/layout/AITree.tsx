import React, { useState, ReactElement } from 'react';
import { NodeTree } from '../nodes/NodeTree';
import { TreeNode, NodeType } from '../../types/tree';
import { SidePanel } from '../panels/SidePanel';
import { AddNodeModal } from '../nodes/AddNodeModal';
import { treeData as initialTreeData } from '../../data/treeData';
import { calculateNodePosition } from '../../utils/treePositionUtils';
import { addNodeToTree, generateNodeId } from '../../utils/treeManipulationUtils';
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
    const [error, setError] = useState<string | null>(null);

    const getNodePos = (node: TreeNode, index: number) => {
        try {
            return calculateNodePosition(node, index, treeData, { startY });
        } catch (error) {
            console.error('Error calculating node position:', error);
            setError('Failed to calculate node position');
            return null;
        }
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
        try {
            const newNode: TreeNode = {
                ...nodeData,
                id: generateNodeId(),
                children: []
            };

            const position = getNodePos(newNode, treeData.length);
            if (!position) {
                throw new Error("Failed to calculate node position");
            }

            setTreeData(currentTreeData =>
                addNodeToTree(currentTreeData, selectedParentId, newNode)
            );
            setIsAddModalOpen(false);
        } catch (error) {
            console.error('Error adding node:', error);
            setError('Failed to add new node');
        }
    };

    const handleClosePanel = () => {
        setSelectedNode(null);
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setSelectedParentId('');
    };

    return (
        <>
            <svg width="100%" height="100%" viewBox="0 0 3432 1716">
                {treeData.map((node, index) => {
                    const position = getNodePos(node, index);
                    if (!position) return null;

                    return (
                        <NodeTree
                            key={node.id}
                            node={node}
                            position={position}
                            index={index}
                            getNodePosition={getNodePos}
                            onNodeClick={handleNodeClick}
                            onAddClick={handleAddClick}
                            showButtons={showButtons}
                        />
                    );
                })}
            </svg>

            {selectedNode && (
                <SidePanel
                    node={selectedNode}
                    onClose={handleClosePanel}
                />
            )}

            {isAddModalOpen && (
                <AddNodeModal
                    parentId={selectedParentId}
                    nodeType={selectedNodeType}
                    onAdd={handleNodeAdd}
                    onClose={handleCloseModal}
                />
            )}

            {error && (
                <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">
                    {error}
                    <button
                        onClick={() => setError(null)}
                        className="ml-2 font-bold"
                    >
                        ×
                    </button>
                </div>
            )}
        </>
    );
};

export default AITree;