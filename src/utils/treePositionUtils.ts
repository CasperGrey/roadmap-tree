// src/utils/treePositionUtils.ts
import { TreeNode } from '../types/tree';

export const getParentNodes = (treeData: TreeNode[]): TreeNode[] =>
    treeData.filter(node => node.type === 'parent');

const findParentChain = (nodeId: string, treeData: TreeNode[]): TreeNode[] => {
    const chain: TreeNode[] = [];
    let current: TreeNode | undefined = treeData.find(n =>
        n.id === nodeId ||
        n.children?.some(c => c.id === nodeId)
    );

    while (current) {
        chain.unshift(current);
        const parent = treeData.find(n => n.children?.some(c => c.id === current!.id));
        if (!parent) break;
        current = parent;
    }
    return chain;
};

export const calculateNodePosition = (
    node: TreeNode,
    index: number,
    treeData: TreeNode[],
    config: { startY?: number } = {}
): { x: number; y: number } => {
    const startY = config.startY || 800;
    const margin = 200;
    const totalWidth = 3432;
    const usableWidth = totalWidth - (margin * 2);
    const parentNodes = getParentNodes(treeData);
    const parentCount = parentNodes.length;
    const parentSpacing = usableWidth / (parentCount - 1);

    // Parent node positioning
    if (node.type === 'parent') {
        const parentIndex = parentNodes.findIndex(p => p.id === node.id);
        return {
            x: margin + (parentIndex * parentSpacing),
            y: startY
        };
    }

    // Find the parent chain for this node
    const parentChain = findParentChain(node.id, treeData);
    const mainParent = parentChain[0];
    if (!mainParent) return { x: 0, y: 0 };

    const parentIndex = parentNodes.findIndex(p => p.id === mainParent.id);
    const parentX = margin + (parentIndex * parentSpacing);

    // Sub node positioning
    if (node.type === 'sub') {
        const siblings = mainParent.children?.filter(c => c.type === 'sub') || [];
        const subIndex = siblings.findIndex(s => s.id === node.id);
        const verticalSpacing = 150;

        return {
            x: parentX,
            y: startY + 200 + (subIndex * verticalSpacing)
        };
    }

    // Sub2 node positioning
    if (node.type === 'sub2') {
        // Find immediate parent (which should be a sub node)
        const subParent = parentChain[parentChain.length - 2];
        if (!subParent || subParent.type !== 'sub') return { x: 0, y: 0 };

        // Get the sub parent's position
        const subSiblings = mainParent.children?.filter(c => c.type === 'sub') || [];
        const subParentIndex = subSiblings.findIndex(s => s.id === subParent.id);
        const subParentY = startY + 200 + (subParentIndex * 150);

        // Position sub2 node diagonally from its sub parent
        const diagonalOffsetX = 150;  // Distance to the right
        const diagonalOffsetY = 100;  // Distance down

        return {
            x: parentX + diagonalOffsetX,
            y: subParentY + diagonalOffsetY
        };
    }

    return { x: 0, y: 0 };
};