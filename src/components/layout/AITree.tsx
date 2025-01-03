// src/components/layout/AITree.tsx
import React, { useState } from 'react';
import { TreeNode as TreeNodeType, SwimLane, Position, NewNodeData } from '../../types/tree';
import { SwimLanes } from './SwimLanes';
import { NodeTree } from '../nodes/NodeTree';
import { ZoomableViewport } from './ZoomableViewport';

interface AITreeProps {
    data: TreeNodeType[];
    onAddNode: (nodeData: NewNodeData) => void;
    onNodeAdd: (parentId: string, nodeType: 'sub' | 'sub2') => void;
}

// Constants
const BASE_HEIGHT = 445.71;
const NODE_SPACING = 250;
const LANE_PADDING = 200;
const MIN_LANE_HEIGHT = BASE_HEIGHT;

export default function AITree({ data, onAddNode, onNodeAdd }: AITreeProps) {
    const [selectedLanes, setSelectedLanes] = useState<Record<string, SwimLane>>({});

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
            if (node.type === 'sub') {
                node.children?.forEach(traverse);
            }
        };

        nodes.forEach(traverse);
        return result;
    };

    const calculateNodeDepth = (node: TreeNodeType): number => {
        if (!node.children?.length) return 1;
        return 1 + Math.max(...node.children.map(calculateNodeDepth));
    };

    const calculateSwimLaneHeights = () => {
        const laneNodes = {
            enable: getAllNodesInLane(data, 'enable'),
            engage: getAllNodesInLane(data, 'engage'),
            evolve: getAllNodesInLane(data, 'evolve')
        };

        const heights = Object.entries(laneNodes).reduce((acc, [lane, nodes]) => {
            const maxDepth = nodes.length ? Math.max(...nodes.map(calculateNodeDepth)) : 0;
            const heightNeeded = Math.max(
                MIN_LANE_HEIGHT,
                (nodes.length * NODE_SPACING * maxDepth) + LANE_PADDING
            );

            return {
                ...acc,
                [lane]: heightNeeded
            };
        }, {} as Record<SwimLane, number>);

        return heights as Record<SwimLane, number>;
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
                const siblings = parent.children?.filter(n => n.type === 'sub') || [];
                const nodeIndex = siblings.indexOf(node);
                return {
                    x: parentPos.x,
                    y: parentPos.y + NODE_SPACING + (nodeIndex * NODE_SPACING)
                };
            }

            const laneHeights = calculateSwimLaneHeights();
            let baseY = 0;

            if (node.swimLane === 'enable') {
                baseY = LANE_PADDING;
            } else if (node.swimLane === 'engage') {
                baseY = laneHeights.enable + LANE_PADDING;
            } else {
                baseY = laneHeights.enable + laneHeights.engage + LANE_PADDING;
            }

            const siblings = getAllNodesInLane([parent], node.swimLane!);
            const nodeIndex = siblings.indexOf(node);
            const siblingSpacing = NODE_SPACING * (siblings.length > 1 ? siblings.length - 1 : 1);

            return {
                x: parentPos.x,
                y: baseY + (nodeIndex * NODE_SPACING) - (siblingSpacing / 2)
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

    const laneHeights = calculateSwimLaneHeights();
    const totalHeight = Math.max(
        1337.12,
        laneHeights.enable + laneHeights.engage + laneHeights.evolve + LANE_PADDING
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
                        onAddClick={onNodeAdd}
                    />
                ))}
            </ZoomableViewport>
        </div>
    );
}