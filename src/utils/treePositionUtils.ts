// src/utils/treePositionUtils.ts
import { TreeNode } from '../types/tree';

export interface PositionConfig {
    totalWidth: number;
    margin: number;
    startY: number;
    verticalSpacing: number;
    subNodeSpacing: number;
    diagonalDistance: number;
    angleInRadians: number;
}

export const DEFAULT_CONFIG: PositionConfig = {
    totalWidth: 3432,
    margin: 200,
    startY: 690,
    verticalSpacing: 150,
    subNodeSpacing: 150,
    diagonalDistance: 150,
    angleInRadians: Math.PI / 6 // 30 degrees
};

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
    config: Partial<PositionConfig> = {}
): { x: number; y: number } => {
    const {
        totalWidth,
        margin,
        startY,
        verticalSpacing,
        diagonalDistance
    } = { ...DEFAULT_CONFIG, ...config };

    const usableWidth = totalWidth - (margin * 2);
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

    // Find parent chain for positioning context
    const parentChain = findParentChain(node.id, treeData);
    if (!parentChain.length) return { x: 0, y: 0 };

    const mainParent = parentChain[0];
    const parentIndex = parentNodes.findIndex(p => p.id === mainParent.id);
    const baseX = margin + (parentIndex * parentSpacing);

    // Sub node positioning
    if (node.type === 'sub') {
        const siblings = mainParent.children?.filter(c => c.type === 'sub') || [];
        const subIndex = siblings.findIndex(s => s.id === node.id);

        return {
            x: baseX,
            y: startY + 310 + (subIndex * verticalSpacing)
        };
    }

    // Sub2 node positioning
    if (node.type === 'sub2') {
        // Find immediate sub parent
        const subParent = parentChain[parentChain.length - 2];
        if (!subParent || subParent.type !== 'sub') return { x: 0, y: 0 };

        // Get sub parent's position
        const subParentSiblings = mainParent.children?.filter(c => c.type === 'sub') || [];
        const subParentIndex = subParentSiblings.findIndex(s => s.id === subParent.id);
        const subParentY = startY + 310 + (subParentIndex * verticalSpacing);

        // Calculate diagonal offset
        const diagonalOffsetX = diagonalDistance;
        const diagonalOffsetY = diagonalDistance * 0.5;  // Adjust this factor to change the angle

        return {
            x: baseX + diagonalOffsetX,
            y: subParentY + diagonalOffsetY
        };
    }

    return { x: 0, y: 0 };
};