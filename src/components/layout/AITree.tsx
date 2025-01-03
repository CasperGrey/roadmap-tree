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

    // Calculate the required height for each swimlane
    const calculateSwimLaneHeights = () => {
        const laneNodes = {
            enable: [] as TreeNodeType[],
            engage: [] as TreeNodeType[],
            evolve: [] as TreeNodeType[]
        };

        // Collect all nodes in their respective lanes
        const processNode = (node: TreeNodeType) => {
            if (node.type === 'sub' && node.swimLane) {
                laneNodes[node.swimLane].push(node);
            }
            node.children?.forEach(processNode);
        };

        data.forEach(processNode);

        // Calculate required height for each lane
        const minHeight = 1337.12 / 3; // Minimum height per lane
        const nodeSpacing = 150; // Vertical spacing between nodes

        return {
            enable: Math.max(minHeight, (laneNodes.enable.length * nodeSpacing) + 100),
            engage: Math.max(minHeight, (laneNodes.engage.length * nodeSpacing) + 100),
            evolve: Math.max(minHeight, (laneNodes.evolve.length * nodeSpacing) + 100)
        };
    };

    const laneHeights = calculateSwimLaneHeights();
    const totalHeight = laneHeights.enable + laneHeights.engage + laneHeights.evolve;

    // Helper function to find siblings in the same lane
    const findSiblingsInLane = (node: TreeNodeType, lane: SwimLane) => {
        const parent = findNode(node.parentId!, data);
        if (!parent) return [];
        return parent.children?.filter(child =>
            child.type === 'sub' && child.swimLane === lane
        ) || [];
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

    const getNodePosition = (node: TreeNodeType, index: number): Position => {
        if (node.type === 'parent') {
            const spacing = 2241.46 / 5;
            return { x: spacing + (index * spacing), y: 100 };
        }

        const parentPos = getParentPosition(node.parentId);

        if (node.type === 'sub' && node.parentId) {
            const parent = findNode(node.parentId, data);

            if (parent?.type === 'sub') {
                // If parent is a sub node, position vertically below it
                const siblings = parent.children?.filter(child => child.type === 'sub') || [];
                const nodeIndex = siblings.indexOf(node);
                return {
                    x: parentPos.x,
                    y: parentPos.y + 150 + (nodeIndex * 150) // Vertical spacing between nodes
                };
            } else {
                // If parent is a parent node, use swim lanes with dynamic heights
                let baseY = 0;
                if (node.swimLane === 'enable') {
                    baseY = laneHeights.enable / 2;
                } else if (node.swimLane === 'engage') {
                    baseY = laneHeights.enable + (laneHeights.engage / 2);
                } else {
                    baseY = laneHeights.enable + laneHeights.engage + (laneHeights.evolve / 2);
                }

                // Find siblings in the same lane to offset position
                const siblings = findSiblingsInLane(node, node.swimLane!);
                const nodeIndex = siblings.indexOf(node);
                const verticalOffset = nodeIndex * 150; // Space between nodes

                return {
                    x: parentPos.x,
                    y: baseY + verticalOffset - ((siblings.length - 1) * 75) // Center the group
                };
            }
        }

        if (node.type === 'sub2' && node.parentId) {
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
            <ZoomableViewport height={totalHeight}>
                <SwimLanes heights={laneHeights} />
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