// src/utils/treePositionUtils.ts
import { TreeNode } from '../types/tree';

export const getParentNodes = (treeData: TreeNode[]): TreeNode[] =>
    treeData.filter(node => node.type === 'parent');

const findParentChain = (nodeId: string, treeData: TreeNode[]): TreeNode[] => {
    const findInNodes = (nodes: TreeNode[], chain: TreeNode[] = []): TreeNode[] => {
        for (const node of nodes) {
            if (node.id === nodeId) {
                return [...chain, node];
            }
            if (node.children) {
                const result = findInNodes(node.children, [...chain, node]);
                if (result.length) return result;
            }
        }
        return [];
    };
    return findInNodes(treeData);
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
    const parentSpacing = usableWidth / (parentNodes.length - 1);

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
    if (!parentChain.length) return { x: 0, y: 0 };

    const mainParent = parentChain[0];
    const parentIndex = parentNodes.findIndex(p => p.id === mainParent.id);
    const parentX = margin + (parentIndex * parentSpacing);
    const verticalSpacing = 150; // Space between sub nodes

    // Sub node positioning
    if (node.type === 'sub') {
        const siblings = mainParent.children?.filter(c => c.type === 'sub') || [];
        const subIndex = siblings.findIndex(s => s.id === node.id);

        return {
            x: parentX,
            y: startY + 200 + (subIndex * verticalSpacing)
        };
    }

    // Sub2 node positioning
    if (node.type === 'sub2') {
        const immediateParent = parentChain[parentChain.length - 2];
        if (!immediateParent || immediateParent.type !== 'sub') {
            return { x: 0, y: 0 };
        }

        // Find the sub parent's position
        const subParentSiblings = mainParent.children?.filter(c => c.type === 'sub') || [];
        const subParentIndex = subParentSiblings.findIndex(s => s.id === immediateParent.id);
        const subParentY = startY + 200 + (subParentIndex * verticalSpacing);

        // Find the next sub sibling to position sub2 between them
        const nextSubSibling = subParentSiblings[subParentIndex + 1];
        const nextSubY = nextSubSibling
            ? startY + 200 + ((subParentIndex + 1) * verticalSpacing)
            : subParentY + verticalSpacing;

        // Position sub2 halfway between current and next sub node
        const horizontalOffset = 150;  // Distance to the right
        const midpointY = (subParentY + nextSubY) / 2;

        return {
            x: parentX + horizontalOffset,
            y: midpointY
        };
    }

    return { x: 0, y: 0 };
};