// src/components/layout/AITree.tsx
import React, { useState, useEffect } from 'react';
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

    const getAllNodesInLane = (nodes: TreeNodeType[], lane: SwimLane): TreeNodeType[] => {
        const result: TreeNodeType[] = [];

        const traverse = (node: TreeNodeType) => {
            if (node.type === 'sub' && node.swimLane === lane) {
                result.push(node);
            }
            node.children?.forEach(traverse);
        };

        nodes.forEach(traverse);
        return result;
    };

    const calculateSwimLaneHeights = () => {
        const laneNodes = {
            enable: getAllNodesInLane(data, 'enable'),
            engage: getAllNodesInLane(data, 'engage'),
            evolve: getAllNodesInLane(data, 'evolve')
        };

        const baseHeight = 445.71;
        const minHeight = baseHeight;
        const nodeSpacing = 150;

        return {
            enable: Math.max(minHeight, (laneNodes.enable.length * nodeSpacing) + 100),
            engage: Math.max(minHeight, (laneNodes.engage.length * nodeSpacing) + 100),
            evolve: Math.max(minHeight, (laneNodes.evolve.length * nodeSpacing) + 100)
        };
    };

    const getParentPosition = (parentId?: string): Position => {
        if (!parentId) return { x: 0, y: 0 };
        const parentNode = findNode(parentId, data);
        if (!parentNode) return { x: 0, y: 0 };

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

        const parent = findNode(node.parentId!, data);
        if (!parent) return { x: 0, y: 0 };

        const parentPos = getNodePosition(parent, data.indexOf(parent));

        if (node.type === 'sub') {
            if (parent.type === 'sub') {
                // Vertical positioning for sub under sub
                const siblings = parent.children?.filter(n => n.type === 'sub') || [];
                const nodeIndex = siblings.indexOf(node);
                return {
                    x: parentPos.x,
                    y: parentPos.y + 150 + (nodeIndex * 150)
                };
            }

            // Handle swimlane positioning
            const laneHeights = calculateSwimLaneHeights();
            const laneSpacing = 50;
            let baseY = 0;

            if (node.swimLane === 'enable') {
                baseY = laneHeights.enable / 2;
            } else if (node.swimLane === 'engage') {
                baseY = laneHeights.enable + (laneHeights.engage / 2);
            } else {
                baseY = laneHeights.enable + laneHeights.engage + (laneHeights.evolve / 2);
            }

            const siblings = getAllNodesInLane([parent], node.swimLane!);
            const nodeIndex = siblings.indexOf(node);

            return {
                x: parentPos.x,
                y: baseY + (nodeIndex * laneSpacing) - ((siblings.length - 1) * laneSpacing / 2)
            };
        }

        if (node.type === 'sub2') {
            return {
                x: parentPos.x + 150,
                y: parentPos.y + 100
            };
        }

        return { x: 0, y: 0 };
    };

    const handleLaneChange = (parentId: string, lane: SwimLane) => {
        setSelectedLanes(prev => ({ ...prev, [parentId]: lane }));
    };

    const handleAddClick = (parentId: string, nodeType: 'sub' | 'sub2') => {
        setActiveParentId(parentId);
        setActiveNodeType(nodeType);
        setIsModalOpen(true);
    };

    const laneHeights = calculateSwimLaneHeights();
    const totalHeight = Math.max(1337.12,
        laneHeights.enable + laneHeights.engage + laneHeights.evolve
    );

    return (
        <div className="relative">
            <ZoomableViewport initialHeight={totalHeight}>
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