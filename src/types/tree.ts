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
    description?: string;
    parentId: string;           // Required - references the actual parent node
    nextSiblingId?: string;     // Optional - references the next node in sequence
    prevSiblingId?: string;     // Optional - references the previous node in sequence
    children?: TreeNode[];      // Optional - contains sub2 nodes or nested structures
}

export interface NewNodeData extends Omit<TreeNode, 'id' | 'children'> {
    parentId: string;
}

export interface TreeConnectorProps {
    start: Position;
    end: Position;
    nodeType: NodeType;
    connectionType: 'vertical' | 'sequential' | 'sub2';
    startRadius?: number;
    endRadius?: number;
}