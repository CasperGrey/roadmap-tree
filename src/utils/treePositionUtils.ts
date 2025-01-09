// src/utils/treePositionUtils.ts
import { TreeNode } from '../types/tree';

export const getParentNodes = (treeData: TreeNode[]): TreeNode[] =>
    treeData.filter(node => node.type === 'parent');

export const findParentChain = (nodeId: string, treeData: TreeNode[]): TreeNode[] => {
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
    const startY = config.startY || 690;
    const totalWidth = 3432;
    const margin = 200;
    const usableWidth = totalWidth - (margin * 2);

    // Get all parent nodes for base positioning
    const parentNodes = getParentNodes(treeData);
    const parentCount = parentNodes.length;
    const parentSpacing = usableWidth / (parentCount - 1);

    if (node.type === 'parent') {
        const parentIndex = parentNodes.findIndex(p => p.id === node.id);
        return {
            x: margin + (parentIndex * parentSpacing),
            y: startY + 110
        };
    }

    const parentChain = findParentChain(node.id, treeData);
    const mainParent = parentChain[0];
    if (!mainParent) return { x: 0, y: 0 };

    const parentIndex = parentNodes.findIndex(p => p.id === mainParent.id);
    const parentX = margin + (parentIndex * parentSpacing);

    if (node.type === 'sub') {
        const subNodes = mainParent.children?.filter(n => n.type === 'sub') || [];
        const subIndex = subNodes.findIndex(s => s.id === node.id);
        const verticalSpacing = 150;
        return {
            x: parentX,
            y: startY + 310 + (subIndex * verticalSpacing)
        };
    }

    if (node.type === 'sub2') {
        const subParent = parentChain[parentChain.length - 2];
        if (!subParent || subParent.type !== 'sub') return { x: 0, y: 0 };

        const subNodes = mainParent.children?.filter(n => n.type === 'sub') || [];
        const subParentIndex = subNodes.findIndex(s => s.id === subParent.id);
        const subY = startY + 310 + (subParentIndex * 150);

        // Calculate diagonal offset for sub2 nodes
        const diagonalDistanceX = 200;  // Distance to the right
        const diagonalDistanceY = 100;  // Distance down

        return {
            x: parentX + diagonalDistanceX,
            y: subY + diagonalDistanceY
        };
    }

    return { x: 0, y: 0 };
};