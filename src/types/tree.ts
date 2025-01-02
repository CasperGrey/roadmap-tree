// src/types/tree.ts

export type NodeType = 'parent' | 'sub' | 'sub2';
export type SwimLane = 'enable' | 'engage' | 'evolve';

export interface Position {
    x: number;
    y: number;
}

export interface TreeNode {
    id: string;
    type: NodeType;
    title: string;
    icon: string;
    swimLane?: SwimLane;
    parentId?: string;
    children?: TreeNode[];
}

export interface TreeConnectorProps {
    start: Position;
    end: Position;
    startRadius?: number;
    endRadius?: number;
}

export interface AddNodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (nodeData: Omit<TreeNode, 'id' | 'children'>) => void;
    parentId: string;
    selectedLane: SwimLane;
    existingNodes?: TreeNode[];
}

export interface AddNodeData {
    parentId: string;
    swimLane: SwimLane;
}