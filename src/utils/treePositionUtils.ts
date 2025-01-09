// src/utils/treePositionUtils.ts
import { TreeNode } from '../types/tree';

export const getParentNodes = (treeData: TreeNode[]): TreeNode[] =>
    treeData.filter(node => node.type === 'parent');

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

    // For parent nodes - use the same spacing calculation as the diagonal lines
    if (node.type === 'parent') {
        const parentIndex = parentNodes.findIndex(p => p.id === node.id);
        return {
            x: margin + (parentIndex * parentSpacing),
            y: startY
        };
    }

    // Find the parent's position for sub nodes
    const parentNode = treeData.find(n => n.children?.some(c => c.id === node.id));
    if (!parentNode) return { x: 0, y: 0 };

    const parentIndex = parentNodes.findIndex(p => p.id === parentNode.id);
    const parentX = margin + (parentIndex * parentSpacing);

    // For sub nodes - align vertically under parent
    if (node.type === 'sub') {
        const siblings = parentNode.children?.filter(c => c.type === 'sub') || [];
        const subIndex = siblings.findIndex(s => s.id === node.id);
        const verticalSpacing = 150;

        return {
            x: parentX,
            y: startY + 200 + (subIndex * verticalSpacing)
        };
    }

    // For sub2 nodes - position diagonally from their immediate sub parent
    if (node.type === 'sub2') {
        const immediateParent = parentNode.children?.find(c =>
            c.children?.some(sub2 => sub2.id === node.id)
        );
        if (!immediateParent) return { x: 0, y: 0 };

        const subNodes = parentNode.children?.filter(c => c.type === 'sub') || [];
        const subIndex = subNodes.indexOf(immediateParent);
        const subY = startY + 200 + (subIndex * 150);

        return {
            x: parentX + 150,  // Diagonal offset to the right
            y: subY + 100    // Diagonal offset down
        };
    }

    return { x: 0, y: 0 };
};