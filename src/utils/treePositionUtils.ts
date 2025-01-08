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
    const baseY = startY + 110;  // Base Y position for parent nodes
    const levelSpacing = 200;    // Vertical spacing between levels
    const horizontalSpacing = 200; // Spacing between siblings

    // Find the complete parent chain for this node
    const parentChain = findParentChain(node.id, treeData);

    if (node.type === 'parent') {
        const parentNodes = getParentNodes(treeData);
        const parentIndex = parentNodes.findIndex(p => p.id === node.id);
        const parentCount = parentNodes.length;
        const parentWidth = 3432 - 400; // Total width minus margins
        const parentSpacing = parentWidth / (parentCount - 1);

        return {
            x: 200 + (parentIndex * parentSpacing), // 200px margin from left
            y: baseY
        };
    }

    // Get the main parent (top-level) node
    const mainParent = parentChain[0];
    if (!mainParent) return { x: 0, y: 0 };

    // Get parent's position
    const parentNodes = getParentNodes(treeData);
    const parentIndex = parentNodes.findIndex(p => p.id === mainParent.id);
    const parentCount = parentNodes.length;
    const parentWidth = 3432 - 400;
    const parentSpacing = parentWidth / (parentCount - 1);
    const parentX = 200 + (parentIndex * parentSpacing);

    if (node.type === 'sub') {
        const siblings = mainParent.children?.filter(c => c.type === 'sub') || [];
        const siblingIndex = siblings.findIndex(s => s.id === node.id);
        const siblingCount = siblings.length;
        const subWidth = horizontalSpacing * (siblingCount - 1);
        const subX = parentX - (subWidth / 2) + (siblingIndex * horizontalSpacing);

        return {
            x: subX,
            y: baseY + levelSpacing
        };
    }

    if (node.type === 'sub2') {
        // Find immediate sub parent
        const subParent = parentChain[parentChain.length - 2];
        if (!subParent || subParent.type !== 'sub') return { x: 0, y: 0 };

        // Calculate sub parent's position
        const subSiblings = mainParent.children?.filter(c => c.type === 'sub') || [];
        const subParentIndex = subSiblings.findIndex(s => s.id === subParent.id);
        const subSiblingCount = subSiblings.length;
        const subWidth = horizontalSpacing * (subSiblingCount - 1);
        const subParentX = parentX - (subWidth / 2) + (subParentIndex * horizontalSpacing);

        // Position sub2 node at an angle from its sub parent
        const angle = Math.PI / 6; // 30 degrees
        const radius = 150;        // Distance from parent

        return {
            x: subParentX + (radius * Math.cos(angle)),
            y: baseY + levelSpacing + (radius * Math.sin(angle))
        };
    }

    return { x: 0, y: 0 };
};