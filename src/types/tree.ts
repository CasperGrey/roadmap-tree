// src/types/tree.ts

export type NodeType = 'parent' | 'sub' | 'sub2';
export type SwimLane = 'enable' | 'engage' | 'evolve';

export interface TreeNode {
    id: string;
    type: NodeType;
    title: string;
    icon: string;
    swimLane?: SwimLane;
    parentId?: string;
    children?: TreeNode[];
}


export interface NodeData {
    title: string;
    description: string;
    x: number;
    y: number;
    color?: string;
    children?: NodeData[];
  }
  
  export interface TreeConnectorProps {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    animated?: boolean;
  }
  
  export interface TreeNodeProps extends Omit<NodeData, 'children'> {
    onClick?: () => void;
    isActive?: boolean;
    isAnimated?: boolean;
  }
