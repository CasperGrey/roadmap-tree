// src/utils/treeManipulationUtils.ts
import { TreeNode } from '../types/tree';

export const addNodeToTree = (
    treeData: TreeNode[],
    parentId: string,
    newNode: TreeNode
): TreeNode[] => {
    const updateNodes = (nodes: TreeNode[]): TreeNode[] => {
        return nodes.map((node: TreeNode): TreeNode => {
            if (node.id === parentId) {
                return {
                    ...node,
                    children: [...(node.children || []), newNode]
                };
            }
            if (node.children) {
                return {
                    ...node,
                    children: updateNodes(node.children)
                };
            }
            return node;
        });
    };
    return updateNodes(treeData);
};

export const generateNodeId = (): string => {
    return `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createNewNode = (
    nodeData: Omit<TreeNode, 'id' | 'children'>
): TreeNode => {
    return {
        ...nodeData,
        id: generateNodeId(),
        children: []
    };
};