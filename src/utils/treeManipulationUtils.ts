import { TreeNode } from '../types/tree';

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

export const getParentNodes = (treeData: TreeNode[]): TreeNode[] =>
    treeData.filter(node => node.type === 'parent');

interface PositionConfig {
    totalWidth: number;
    margin: number;
    startY: number;
    verticalSpacing: number;
    subNodeSpacing: number;
    diagonalDistance: number;
    angleInRadians: number;
}

const DEFAULT_CONFIG: PositionConfig = {
    totalWidth: 3432,
    margin: 200,
    startY: 690,
    verticalSpacing: 150,
    subNodeSpacing: 150,
    diagonalDistance: 150,
    angleInRadians: Math.PI / 6 // 30 degrees
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
        subNodeSpacing,
        diagonalDistance,
        angleInRadians
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

    // Find parent chain and base positions
    const parentChain = findParentChain(node.id, treeData);
    const mainParent = parentChain[0];
    if (!mainParent) return { x: 0, y: 0 };

    const parentIndex = parentNodes.findIndex(p => p.id === mainParent.id);
    const parentX = margin + (parentIndex * parentSpacing);

    // Sub node positioning
    if (node.type === 'sub') {
        const subNodes = mainParent.children || [];
        const subIndex = subNodes.findIndex(s => s.id === node.id);
        return {
            x: parentX,
            y: startY + 310 + (subIndex * verticalSpacing)
        };
    }

    // Sub2 node positioning
    if (node.type === 'sub2') {
        const immediateParent = parentChain[parentChain.length - 2];
        if (!immediateParent) return { x: 0, y: 0 };

        const subNodes = mainParent.children || [];
        const subIndex = subNodes.findIndex(s => s.id === immediateParent.id);

        return {
            x: parentX + (diagonalDistance * Math.cos(angleInRadians)),
            y: startY + 310 + (subIndex * verticalSpacing) + (diagonalDistance * Math.sin(angleInRadians))
        };
    }

    return { x: 0, y: 0 };
};