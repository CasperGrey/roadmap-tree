import { TreeNode, Position } from '../types/tree';

interface PositionConfig {
    startY?: number;
    parentSpacing?: number;
    levelSpacing?: number;
    margin?: number;
}

const DEFAULT_CONFIG: Required<PositionConfig> = {
    startY: 800,
    parentSpacing: 400,
    levelSpacing: 200,
    margin: 200
};

export const calculateNodePosition = (
    node: TreeNode,
    index: number,
    treeData: TreeNode[],
    config: PositionConfig = {}
): Position => {
    const { startY, parentSpacing, levelSpacing, margin } = {
        ...DEFAULT_CONFIG,
        ...config
    };

    const parentNodes = getParentNodes(treeData);
    const totalWidth = 3432;
    const usableWidth = totalWidth - (margin * 2);
    const spacing = usableWidth / (parentNodes.length - 1);

    if (node.type === 'parent') {
        const parentIndex = parentNodes.findIndex(n => n.id === node.id);
        return {
            x: margin + (parentIndex * spacing),
            y: startY
        };
    }

    const parent = findParentNode(treeData, node.id);
    if (!parent) {
        throw new Error(`Parent not found for node ${node.id}`);
    }

    const parentPos = calculateNodePosition(parent, index, treeData, config);
    const siblings = parent.children || [];
    const nodeIndex = siblings.findIndex(n => n.id === node.id);

    if (node.type === 'sub') {
        const siblingSpacing = parentSpacing / (siblings.length + 1);
        return {
            x: parentPos.x - (parentSpacing / 2) + ((nodeIndex + 1) * siblingSpacing),
            y: parentPos.y + levelSpacing
        };
    }

    if (node.type === 'sub2') {
        const subParent = siblings.find(s => s.children?.some(c => c.id === node.id));
        if (!subParent) {
            throw new Error(`Sub parent not found for node ${node.id}`);
        }

        const subParentPos = calculateNodePosition(subParent, index, treeData, config);
        const subSiblings = subParent.children || [];
        const subIndex = subSiblings.findIndex(n => n.id === node.id);
        const subSpacing = parentSpacing / (subSiblings.length + 1);

        return {
            x: subParentPos.x - (parentSpacing / 2) + ((subIndex + 1) * subSpacing),
            y: subParentPos.y + levelSpacing
        };
    }

    throw new Error(`Invalid node type: ${node.type}`);
};

export const getParentNodes = (treeData: TreeNode[]): TreeNode[] => {
    return treeData.filter(node => node.type === 'parent');
};

export const findParentNode = (
    treeData: TreeNode[],
    nodeId: string
): TreeNode | null => {
    for (const node of treeData) {
        if (node.children?.some(child => child.id === nodeId)) {
            return node;
        }
        if (node.children) {
            const found = findParentNode(node.children, nodeId);
            if (found) return found;
        }
    }
    return null;
};