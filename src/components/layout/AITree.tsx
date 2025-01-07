import React, { useState, useEffect } from 'react';
import { SwimLanes } from './SwimLanes';
import { ZoomableViewport } from './ZoomableViewport';
import { NodeTree } from '../nodes/NodeTree';
import { TreeNode, SwimLane } from '../../types/tree';
import { AddNodeModal } from '../nodes/AddNodeModal';
import { treeData as initialTreeData } from '../../data/treeData';

const AITree: React.FC = () => {
    const [treeData, setTreeData] = useState<TreeNode[]>(initialTreeData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedParentId, setSelectedParentId] = useState<string>('');
    const [selectedNodeType, setSelectedNodeType] = useState<'sub' | 'sub2'>('sub');
    const [selectedLane, setSelectedLane] = useState<SwimLane>('enable');

    // Calculate heights for swim lanes based on content
    const laneHeights: Record<SwimLane, number> = {
        enable: 400,
        engage: 400,
        evolve: 400
    };

    // Calculate total height for viewport
    const totalHeight = Object.values(laneHeights).reduce((a, b) => a + b, 0);

    // Function to calculate node positions
    const getNodePosition = (node: TreeNode, index: number) => {
        const baseX = 150 + (index * 300);
        const baseY = node.swimLane === 'enable' ? 200 :
            node.swimLane === 'engage' ? 600 : 1000;

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

    const handleNodeAdd = (nodeData: Omit<TreeNode, 'id' | 'children'> & { parentId: string }) => {
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
            <ZoomableViewport initialHeight={totalHeight}>
                {/* Swim Lanes Background */}
                <SwimLanes heights={laneHeights} />

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
                selectedLane={selectedLane}
                nodeType={selectedNodeType}
            />
        </div>
    );
};

export default AITree;