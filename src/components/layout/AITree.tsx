// src/components/layout/AITree.tsx
import React, { useState } from 'react';
import { TreeNode as TreeNodeType, SwimLane, Position, NewNodeData } from '../../types/tree';
import { SwimLanes } from './SwimLanes';
import { AddNodeModal } from '../nodes/AddNodeModal';
import { NodeTree } from '../nodes/NodeTree';
import { ZoomableViewport } from './ZoomableViewport';

interface AITreeProps {
    data: TreeNodeType[];
    onAddNode: (nodeData: NewNodeData) => void;
}

export default function AITree({ data, onAddNode }: AITreeProps) {
    const [selectedLanes, setSelectedLanes] = useState<Record<string, SwimLane>>({});
    const [activeParentId, setActiveParentId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeNodeType, setActiveNodeType] = useState<'sub' | 'sub2'>('sub');

    // Helper function to find a node in the tree
    const findNode = (nodeId: string, nodes: TreeNodeType[]): TreeNodeType | null => {
        for (const node of nodes) {
            if (node.id === nodeId) return node;
            if (node.children) {
                const found = findNode(nodeId, node.children);
                if (found) return found;
            }
        }
        return null;
    };

    const getParentPosition = (parentId?: string): Position => {
        if (!parentId) return { x: 0, y: 0 };
        const parentNode = findNode(parentId, data);
        if (!parentNode) return { x: 0, y: 0 };

        // Get the root parent index for horizontal spacing
        const rootParent = data.find(node =>
            findNode(parentId, [node]) !== null
        );
        const rootIndex = rootParent ? data.indexOf(rootParent) : 0;

        return getNodePosition(parentNode, rootIndex);
    };

    const getNodePosition = (node: TreeNodeType, rootIndex: number): Position => {
        // For parent nodes (root level)
        if (node.type === 'parent') {
            const spacing = 2241.46 / 5;
            return { x: spacing + (rootIndex * spacing), y: 100 };
        }

        const parentPos = getParentPosition(node.parentId);

        // For sub nodes
        if (node.type === 'sub') {
            const parent = findNode(node.parentId!, data);

            if (parent?.type === 'sub') {
                // If parent is a sub node, position vertically below it
                return {
                    x: parentPos.x,
                    y: parentPos.y + 150 // Vertical spacing between sub nodes
                };
            } else {
                // If parent is a parent node, use swim lanes
                const laneHeight = 1337.12 / 3;
                const laneIndex = node.swimLane === 'enable' ? 0 :
                    node.swimLane === 'engage' ? 1 : 2;
                return {
                    x: parentPos.x,
                    y: (laneHeight * laneIndex) + (laneHeight / 2)
                };
            }
        }

        // For sub2 nodes, position diagonally
        if (node.type === 'sub2') {
            return {
                x: parentPos.x + 150, // Move right
                y: parentPos.y + 100  // Move down
            };
        }

        return { x: 0, y: 0 };
    };

    const handleLaneChange = (parentId: string, lane: SwimLane) => {
        setSelectedLanes(prev => ({ ...prev, [parentId]: lane }));
    };

    const handleAddClick = (parentId: string, nodeType: 'sub' | 'sub2') => {
        console.log('Adding node:', { parentId, nodeType });
        setActiveParentId(parentId);
        setActiveNodeType(nodeType);
        setIsModalOpen(true);
    };

    return (
        <div className="relative">
            <ZoomableViewport>
                <SwimLanes />
                {data.map((node, index) => (
                    <NodeTree
                        key={node.id}
                        node={node}
                        position={getNodePosition(node, index)}
                        index={index}
                        getNodePosition={getNodePosition}
                        selectedLane={selectedLanes[node.id] || 'enable'}
                        onLaneChange={handleLaneChange}
                        onAddClick={handleAddClick}
                    />
                ))}
            </ZoomableViewport>

            <AddNodeModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setActiveParentId(null);
                }}
                parentId={activeParentId || ''}
                selectedLane={selectedLanes[activeParentId || ''] || 'enable'}
                onAdd={(nodeData: NewNodeData) => {
                    onAddNode({
                        ...nodeData,
                        type: activeNodeType
                    });
                    setIsModalOpen(false);
                    setActiveParentId(null);
                }}
                nodeType={activeNodeType}
            />
        </div>
    );
}