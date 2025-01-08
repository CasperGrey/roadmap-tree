// src/types/tree.ts
export type NodeType = 'parent' | 'sub' | 'sub2';

export interface Position {
    x: number;
    y: number;
}

export interface TreeNode {
    id: string;
    type: NodeType;
    title: string;
    icon: string;
    parentId?: string;
    children?: TreeNode[];
}

export interface NewNodeData extends Omit<TreeNode, 'id' | 'children'> {
    parentId: string; // Make parentId required for new nodes
}

export interface TreeConnectorProps {
    start: Position;
    end: Position;
    nodeType: NodeType;
    startRadius?: number;
    endRadius?: number;
}