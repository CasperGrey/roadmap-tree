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
    const verticalSpacing = 150;

    // Get all parent nodes for base positioning
    const parentNodes = getParentNodes(treeData);
    const parentCount = parentNodes.length;
    const parentSpacing = usableWidth / (parentCount - 1);

    // Parent node positioning
    if (node.type === 'parent') {
        const parentIndex = parentNodes.findIndex(p => p.id === node.id);
        return {
            x: margin + (parentIndex * parentSpacing),
            y: startY + 110
        };
    }

    // Find immediate and top-level parents
    const parentChain = findParentChain(node.id, treeData);
    const mainParent = parentChain[0];
    if (!mainParent) return { x: 0, y: 0 };

    const parentIndex = parentNodes.findIndex(p => p.id === mainParent.id);
    const parentX = margin + (parentIndex * parentSpacing);

    // Sub node positioning
    if (node.type === 'sub') {
        const subNodes = mainParent.children?.filter(n => n.type === 'sub') || [];
        const subIndex = subNodes.findIndex(s => s.id === node.id);
        return {
            x: parentX,
            y: startY + 310 + (subIndex * verticalSpacing)
        };
    }

    // Sub2 node positioning
    if (node.type === 'sub2') {
        // Find the immediate sub parent
        const subParent = parentChain[parentChain.length - 2];
        if (!subParent || subParent.type !== 'sub') return { x: 0, y: 0 };

        // Get the sub parent's position
        const subNodes = mainParent.children?.filter(n => n.type === 'sub') || [];
        const subParentIndex = subNodes.findIndex(s => s.id === subParent.id);
        const subParentY = startY + 310 + (subParentIndex * verticalSpacing);

        // Calculate diagonal position
        const diagonalXOffset = 200;  // Distance to the right
        const diagonalYOffset = 100;  // Distance down

        // Get position among sibling sub2 nodes if any
        const sub2Siblings = subParent.children || [];
        const sub2Index = sub2Siblings.findIndex(s => s.id === node.id);
        const sub2Spacing = 50; // Additional spacing between multiple sub2 nodes

        return {
            x: parentX + diagonalXOffset + (sub2Index * sub2Spacing),
            y: subParentY + diagonalYOffset + (sub2Index * sub2Spacing)
        };
    }

    return { x: 0, y: 0 };
};