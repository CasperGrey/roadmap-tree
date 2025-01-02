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

    const getParentPosition = (parentId?: string): Position => {
        if (!parentId) return { x: 0, y: 0 };
        const parentNode = data.find(node => node.id === parentId);
        if (!parentNode) return { x: 0, y: 0 };
        const parentIndex = data.indexOf(parentNode);
        return getNodePosition(parentNode, parentIndex);
    };

    const getNodePosition = (node: TreeNodeType, index: number): Position => {
        if (node.type === 'parent') {
            const spacing = 2241.46 / 5;
            return { x: spacing + (index * spacing), y: 100 };
        }
        if (node.type === 'sub' && node.parentId) {
            const laneHeight = 1337.12 / 3;
            const laneIndex = node.swimLane === 'enable' ? 0 : node.swimLane === 'engage' ? 1 : 2;
            const parentPos = getParentPosition(node.parentId);
            return {
                x: parentPos.x,
                y: (laneHeight * laneIndex) + (laneHeight / 2)
            };
        }
        if (node.type === 'sub2' && node.parentId) {
            const parentPos = getParentPosition(node.parentId);
            return { x: parentPos.x + 150, y: parentPos.y + 150 };
        }
        return { x: 0, y: 0 };
    };

    const handleLaneChange = (parentId: string, lane: SwimLane) => {
        setSelectedLanes(prev => ({ ...prev, [parentId]: lane }));
    };

    const handleAddClick = (parentId: string) => {
        setActiveParentId(parentId);
        setIsModalOpen(true);
    };

    return (
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

            {activeParentId && (
                <AddNodeModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setActiveParentId(null);
                    }}
                    parentId={activeParentId}
                    selectedLane={selectedLanes[activeParentId] || 'enable'}
                    onAdd={(nodeData: NewNodeData) => {
                        onAddNode(nodeData);
                        setIsModalOpen(false);
                        setActiveParentId(null);
                    }}
                />
            )}
        </ZoomableViewport>
    );
}