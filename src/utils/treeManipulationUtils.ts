import { v4 as uuidv4 } from 'uuid';
import { TreeNode, NewNodeData } from '../types/tree';

export const generateNodeId = (): string => {
    return `node-${uuidv4()}`;
};

export const addNodeToTree = (
    treeData: TreeNode[],
    parentId: string,
    newNode: TreeNode
): TreeNode[] => {
    if (!treeData || !parentId || !newNode) {
        throw new Error('Invalid parameters for addNodeToTree');
    }

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

    try {
        return updateNodes(treeData);
    } catch (error) {
        console.error('Error updating tree:', error);
        throw new Error('Failed to update tree structure');
    }
};

export const createNewNode = (nodeData: NewNodeData): TreeNode => {
    return {
        ...nodeData,
        id: generateNodeId(),
        children: [],
        nextSiblingId: undefined,
        prevSiblingId: undefined
    };
};