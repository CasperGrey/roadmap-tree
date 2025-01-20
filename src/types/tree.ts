export type NodeType = 'parent' | 'sub' | 'sub2';

export interface Position {
    x: number;
    y: number;
}

export interface TreeNode {
    id: string;
    title: string;
    description?: string;
    icon: string;
    type: NodeType;
    children?: TreeNode[];
    parentId?: string;
    prevSiblingId?: string;
}

export interface NewNodeData {
    title: string;
    description?: string;
    icon: string;
    type: NodeType;
    parentId: string;
}

export interface TreeNodeStyles {
    radius: number;
    fill: string;
    titleOffset: number;
    titleClass: string;
    iconSize: number;
}