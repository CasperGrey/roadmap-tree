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

// Move getParentNodes to the top since it's used in calculateNodePosition
export const getParentNodes = (treeData: TreeNode[]): TreeNode[] => {
    return treeData.filter((node: TreeNode) => node.type === 'parent');
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
        const parentIndex = parentNodes.findIndex((n: TreeNode) => n.id === node.id);
        return {
            x: margin + (parentIndex * spacing),
            y: startY
        };
    }

    // Find the immediate parent for the current node
    const parent = findParentNode(treeData, node.id);
    if (!parent) {
        console.error(`Parent not found for node ${node.id}`);
        return { x: 0, y: 0 };
    }

    const parentPos = calculateNodePosition(parent, index, treeData, config);

    // Handle sub nodes
    if (node.type === 'sub') {
        const siblings = parent.children?.filter((child: TreeNode) => child.type === 'sub') || [];
        const nodeIndex = siblings.findIndex((n: TreeNode) => n.id === node.id);

        // Calculate vertical position based on index
        return {
            x: parentPos.x,  // Keep x position aligned with parent
            y: parentPos.y + ((nodeIndex + 1) * levelSpacing)  // Stack vertically based on index
        };
    }

// Handle sub2 nodes
    if (node.type === 'sub2') {
        const subParent = findDirectParent(treeData, node.id);
        if (!subParent) {
            console.error(`Sub parent not found for node ${node.id}`);
            return { x: 0, y: 0 };
        }

        const subParentPos = calculateNodePosition(subParent, index, treeData, config);
        const subSiblings = subParent.children?.filter((child: TreeNode) => child.type === 'sub2') || [];
        const subIndex = subSiblings.findIndex((n: TreeNode) => n.id === node.id);

        // Position sub2 nodes diagonally down and to the right from their parent sub node
        return {
            x: subParentPos.x + parentSpacing,  // Move to the right by parentSpacing
            y: subParentPos.y + ((subIndex + 1) * levelSpacing)  // Move down diagonally based on index
        };
    }

    throw new Error(`Invalid node type: ${node.type}`);
};

const findDirectParent = (treeData: TreeNode[], nodeId: string): TreeNode | null => {
    for (const node of treeData) {
        if (node.children?.some((child: TreeNode) => child.id === nodeId)) {
            return node;
        }
        if (node.children) {
            for (const child of node.children) {
                if (child.children?.some((grandChild: TreeNode) => grandChild.id === nodeId)) {
                    return child;
                }
            }
        }
    }
    return null;
};

export const findParentNode = (
    treeData: TreeNode[],
    nodeId: string
): TreeNode | null => {
    for (const node of treeData) {
        if (node.children?.some((child: TreeNode) => child.id === nodeId)) {
            return node;
        }
        if (node.children) {
            for (const child of node.children) {
                if (child.children?.some((grandChild: TreeNode) => grandChild.id === nodeId)) {
                    return child;
                }
            }
        }
    }
    return null;
};