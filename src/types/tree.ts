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
    parentId: string;
    nextSiblingId?: string;
    prevSiblingId?: string;
    children?: TreeNode[];
}

export interface NewNodeData {
    type: NodeType;
    title: string;
    icon: string;
    description?: string;
    parentId: string;
}

export interface AddNodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (nodeData: NewNodeData) => void;
    parentId: string;
    nodeType: 'sub' | 'sub2';
}

export interface TreeConnectorProps {
    start: Position;
    end: Position;
    nodeType: NodeType;
    connectionType: 'vertical' | 'sequential' | 'sub2';
    startRadius?: number;
    endRadius?: number;
}