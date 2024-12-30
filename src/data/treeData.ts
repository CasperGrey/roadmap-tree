// src/data/treeData.ts
export interface TreeNode {
    id: string;
    title: string;
    description: string;
    children?: TreeNode[];
}

export const treeData: TreeNode = {
    id: 'root',
    title: 'FOUNDATION',
    description: 'Core AI governance and controls',
    children: [
        {
            id: 'policy',
            title: 'POLICY & GOVERNANCE',
            description: 'Risk framework and controls',
            children: []
        },
        {
            id: 'security',
            title: 'SECURITY CONTROLS',
            description: 'MS Purview implementation',
            children: []
        }
    ]
};