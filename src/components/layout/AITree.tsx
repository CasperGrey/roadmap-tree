// src/components/layout/AITree.tsx
import React from 'react';
import { TreeNode as TreeNodeType, Position, NewNodeData } from '../../types/tree';
import { NodeTree } from '../nodes/NodeTree';
import { ZoomableViewport } from './ZoomableViewport';
import { Decorations } from '../decorative/decorations';

interface AITreeProps {
    data: TreeNodeType[];
    onAddNode: (nodeData: NewNodeData) => void;
    onNodeAdd: (parentId: string, nodeType: 'sub' | 'sub2') => void;
}

// Constants
const BASE_HEIGHT = 1337.12;
const NODE_SPACING_VERTICAL = 150;
const NODE_SPACING_HORIZONTAL = 2241.46 / 5;

export default function AITree({ data, onNodeAdd }: AITreeProps) {
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

    const getNodePosition = (node: TreeNodeType, index: number): Position => {
        if (node.type === 'parent') {
            return {
                x: NODE_SPACING_HORIZONTAL + (index * NODE_SPACING_HORIZONTAL),
                y: 200 // Increased to account for decorations
            };
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
                    y: parentPos.y + NODE_SPACING_VERTICAL + (nodeIndex * NODE_SPACING_VERTICAL)
                };
            }

            // If parent is a parent node
            const siblings = parent.children?.filter(n => n.type === 'sub') || [];
            const nodeIndex = siblings.indexOf(node);
            return {
                x: parentPos.x,
                y: parentPos.y + NODE_SPACING_VERTICAL + (nodeIndex * NODE_SPACING_VERTICAL)
            };
        }

        if (node.type === 'sub2') {
            return {
                x: parentPos.x + NODE_SPACING_VERTICAL, // Diagonal offset
                y: parentPos.y + NODE_SPACING_VERTICAL
            };
        }

        return { x: 0, y: 0 };
    };

    // Calculate total height based on deepest branch
    const calculateTotalHeight = (nodes: TreeNodeType[]): number => {
        let maxDepth = 0;

        const getDepth = (node: TreeNodeType, currentDepth: number) => {
            maxDepth = Math.max(maxDepth, currentDepth);
            node.children?.forEach(child => getDepth(child, currentDepth + 1));
        };

        nodes.forEach(node => getDepth(node, 1));

        return Math.max(BASE_HEIGHT, (maxDepth + 1) * NODE_SPACING_VERTICAL + 200);
    };

    const totalHeight = calculateTotalHeight(data);

    return (
        <div className="relative">
            <ZoomableViewport initialHeight={totalHeight}>
                <Decorations />
                {data.map((node, index) => (
                    <NodeTree
                        key={node.id}
                        node={node}
                        position={getNodePosition(node, index)}
                        index={index}
                        getNodePosition={getNodePosition}
                        onAddClick={onNodeAdd}
                    />
                ))}
            </ZoomableViewport>
        </div>
    );
}