import React, { useState } from 'react';
import { ZoomableViewport } from './ZoomableViewport';
import { NodeTree } from '../nodes/NodeTree';
import { TreeNode } from '../../types/tree';
import { AddNodeModal } from '../nodes/AddNodeModal';
import { treeData as initialTreeData } from '../../data/treeData';

const AITree: React.FC = () => {
    const [treeData, setTreeData] = useState<TreeNode[]>(initialTreeData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedParentId, setSelectedParentId] = useState<string>('');
    const [selectedNodeType, setSelectedNodeType] = useState<'sub' | 'sub2'>('sub');

    // Calculate node positions
    const getNodePosition = (node: TreeNode, index: number) => {
        let baseY = 200; // Starting Y position

        // Adjust Y position based on node type and parent-child relationship
        if (node.type === 'sub') {
            baseY = 400;
        } else if (node.type === 'sub2') {
            baseY = 600;
        }

        // Calculate X position based on index and level
        const baseX = 150 + (index * 300);

        return {
            x: baseX,
            y: baseY
        };
    };

    const handleAddNode = (parentId: string, nodeType: 'sub' | 'sub2') => {
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

        const updateTree = (nodes: TreeNode[]): TreeNode[] => {
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
                        children: updateTree(node.children)
                    };
                }
                return node;
            });
        };

        setTreeData(updateTree(treeData));
        setIsModalOpen(false);
    };

    return (
        <div className="relative w-full h-full">
            <ZoomableViewport initialHeight={1000}>
                {/* Tree Nodes */}
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
            </ZoomableViewport>

            {/* Add Node Modal */}
            <AddNodeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleNodeAdd}
                parentId={selectedParentId}
                nodeType={selectedNodeType}
            />
        </div>
    );
};

export default AITree;