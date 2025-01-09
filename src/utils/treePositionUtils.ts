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

const findNode = (nodeId: string, nodes: TreeNode[]): TreeNode | null => {
    for (const node of nodes) {
        if (node.id === nodeId) return node;
        if (node.children) {
            const found = findNode(nodeId, node.children);
            if (found) return found;
        }
    }
    return null;
};

const getParentPosition = (parentId: string | undefined, treeData: TreeNode[]): { x: number; y: number } => {
    if (!parentId) return { x: 0, y: 0 };
    const parentNode = findNode(parentId, treeData);
    if (!parentNode) return { x: 0, y: 0 };

    const rootParent = treeData.find(node => findNode(parentId, [node]) !== null);
    const rootIndex = rootParent ? treeData.indexOf(rootParent) : 0;

    return calculateNodePosition(parentNode, rootIndex, treeData);
};

export const calculateNodePosition = (
    node: TreeNode,
    index: number,
    treeData: TreeNode[],
    config: { startY?: number } = {}
): { x: number; y: number } => {
    const startY = config.startY || 800;
    const totalWidth = 3432;
    const margin = 200;
    const usableWidth = totalWidth - (margin * 2);
    const spacing = usableWidth / 5;

    // For parent nodes
    if (node.type === 'parent') {
        const parentIndex = getParentNodes(treeData).indexOf(node);
        return {
            x: margin + (spacing * parentIndex),
            y: startY
        };
    }

    // Get parent position
    const parentPos = getParentPosition(node.parentId, treeData);

    // For sub nodes
    if (node.type === 'sub') {
        const parent = findNode(node.parentId!, treeData);
        if (!parent) return { x: 0, y: 0 };

        const siblings = parent.children?.filter(c => c.type === 'sub') || [];
        const siblingIndex = siblings.findIndex(s => s.id === node.id);

        return {
            x: parentPos.x,
            y: startY + 200 + (siblingIndex * 150)
        };
    }

    // For sub2 nodes - position diagonally from parent sub node
    if (node.type === 'sub2') {
        const parent = findNode(node.parentId!, treeData);
        if (!parent || parent.type !== 'sub') return { x: 0, y: 0 };

        return {
            x: parentPos.x + 150,
            y: parentPos.y + 100
        };
    }

    return { x: 0, y: 0 };
};