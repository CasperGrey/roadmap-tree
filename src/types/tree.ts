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
    parentId?: string;  // Make optional since parent nodes don't have a parentId
    nextSiblingId?: string;
    prevSiblingId?: string;
    children?: TreeNode[];
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

export interface AddNodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (nodeData: NewNodeData) => void;
    parentId: string;
    nodeType: Extract<NodeType, 'sub' | 'sub2'>;
}