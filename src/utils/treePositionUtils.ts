// treePositionUtils.ts
import { TreeNode, Position } from '../types/tree';

interface PositionConfig {
    startY?: number;
    parentSpacing?: number;
    levelSpacing?: number;
    margin?: number;
}

const DEFAULT_CONFIG: Required<PositionConfig> = {
    startY: 800,
    parentSpacing: 400,
    levelSpacing: 200,
    margin: 200
};

export const calculateNodePosition = (
    node: TreeNode,
    index: number,
    treeData: TreeNode[],
    config: PositionConfig = {}
): Position => {
    const { startY, parentSpacing, levelSpacing, margin } = {
        ...DEFAULT_CONFIG,
        ...config
    };

    const parentNodes = getParentNodes(treeData);
    const totalWidth = 3432;
    const usableWidth = totalWidth - (margin * 2);
    const spacing = usableWidth / (parentNodes.length - 1);

    // Handle parent nodes
    if (node.type === 'parent') {
        const parentIndex = parentNodes.findIndex(n => n.id === node.id);
        return {
            x: margin + (parentIndex * spacing),
            y: startY
        };
    }

    // Find the immediate parent for the current node
    const parent = findParentNode(treeData, node.id);
    if (!parent) {
        console.error(`Parent not found for node ${node.id}`);
        return { x: 0, y: 0 }; // Fallback position
    }

    const parentPos = calculateNodePosition(parent, index, treeData, config);

    // Handle sub nodes
    if (node.type === 'sub') {
        const siblings = parent.children?.filter(child => child.type === 'sub') || [];
        const nodeIndex = siblings.findIndex(n => n.id === node.id);
        const siblingSpacing = parentSpacing / (siblings.length + 1);

        return {
            x: parentPos.x - (parentSpacing / 2) + ((nodeIndex + 1) * siblingSpacing),
            y: parentPos.y + levelSpacing
        };
    }

    // Handle sub2 nodes
    if (node.type === 'sub2') {
        // Find the sub node that is the parent of this sub2 node
        const subParent = findDirectParent(treeData, node.id);
        if (!subParent) {
            console.error(`Sub parent not found for node ${node.id}`);
            return { x: 0, y: 0 }; // Fallback position
        }

        const subParentPos = calculateNodePosition(subParent, index, treeData, config);
        const subSiblings = subParent.children?.filter(child => child.type === 'sub2') || [];
        const subIndex = subSiblings.findIndex(n => n.id === node.id);

        // Position sub2 nodes to the right of their sub parent
        return {
            x: subParentPos.x + parentSpacing / 2,
            y: subParentPos.y + (subIndex * levelSpacing / 2)
        };
    }

    throw new Error(`Invalid node type: ${node.type}`);
};

// Helper function to find the direct parent of a node
const findDirectParent = (treeData: TreeNode[], nodeId: string): TreeNode | null => {
    for (const node of treeData) {
        if (node.children?.some(child => child.id === nodeId)) {
            return node;
        }
        if (node.children) {
            for (const child of node.children) {
                if (child.children?.some(grandChild => grandChild.id === nodeId)) {
                    return child;
                }
            }
        }
    }
    return null;
};

export const getParentNodes = (treeData: TreeNode[]): TreeNode[] => {
    return treeData.filter(node => node.type === 'parent');
};

export const findParentNode = (
    treeData: TreeNode[],
    nodeId: string
): TreeNode | null => {
    for (const node of treeData) {
        if (node.children?.some(child => child.id === nodeId)) {
            return node;
        }
        if (node.children) {
            for (const child of node.children) {
                if (child.children?.some(grandChild => grandChild.id === nodeId)) {
                    return child;
                }
            }
        }
    }
    return null;
};