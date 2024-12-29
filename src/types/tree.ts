// src/types/tree.ts
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