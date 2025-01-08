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

    // Find the parent chain for positioning context
    const parentChain = findParentChain(node.id, treeData);
    const mainParent = parentChain[0];

    if (!mainParent) return { x: 0, y: 0 };

    const parentIndex = parentNodes.findIndex(p => p.id === mainParent.id);
    const parentX = margin + (parentIndex * parentSpacing);

    if (node.type === 'sub') {
        // Position each sub node vertically under its parent
        const parentNode = mainParent;
        const subNodes = parentNode.children || [];
        const verticalSpacing = 150; // Space between sub nodes
        const subIndex = subNodes.findIndex(s => s.id === node.id);

        return {
            x: parentX,
            y: startY + 310 + (subIndex * verticalSpacing)
        };
    }

    if (node.type === 'sub2') {
        // Find immediate parent (sub node)
        const immediateParent = parentChain[parentChain.length - 2];
        if (!immediateParent || immediateParent.type !== 'sub') return { x: 0, y: 0 };

        // Get parent sub's position
        const parentSubs = mainParent.children || [];
        const parentSubIndex = parentSubs.findIndex(s => s.id === immediateParent.id);
        const parentSubY = startY + 310 + (parentSubIndex * 150);

        // Position sub2 node diagonally to the right
        const diagonalDistance = 150;
        const angleInRadians = Math.PI / 6; // 30 degrees

        return {
            x: parentX + diagonalDistance,
            y: parentSubY + (diagonalDistance * 0.5) // Adjust this multiplier to change angle
        };
    }

    return { x: 0, y: 0 };
};