// src/data/treeData.ts
export type NodeType = 'parent' | 'sub' | 'sub2';

export interface TreeNode {
    id: string;
    type: NodeType;
    title: string;
    description?: string;
    icon: string;  // SVG path or icon name
    parentId?: string;  // for sub and sub2 nodes
    children?: TreeNode[];
}

export const treeData: TreeNode = {
    id: 'foundation',
    type: 'parent',
    title: 'Foundation',
    icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6',  // Example SVG path
    children: [
        {
            id: 'policy',
            type: 'sub',
            title: 'Policy & Governance',
            icon: 'M9 12l2 2 4-4',
            parentId: 'foundation',
            children: [
                {
                    id: 'risk',
                    type: 'sub2',
                    title: 'Risk Framework',
                    icon: 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z',
                    parentId: 'policy'
                }
            ]
        }
    ]
};