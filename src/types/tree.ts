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

export type NewNodeData = Omit<TreeNode, 'id' | 'children'> & {
    parentId: string;  // Make parentId required for new nodes
    swimLane: SwimLane; // Make swimLane required for new nodes
};

export interface TreeConnectorProps {
    start: Position;
    end: Position;
    startRadius?: number;
    endRadius?: number;
}