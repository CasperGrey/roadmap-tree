// src/data/treeData.ts
import { TreeNode } from '../types/tree';

export const treeData: TreeNode[] = [
    {
        id: 'generative-ai',
        type: 'parent',
        title: 'Generative AI',
        icon: '+',  // We can change these icons later
        children: []
    },
    {
        id: 'productivity-ai',
        type: 'parent',
        title: 'Productivity AI',
        icon: '+',
        children: []
    },
    {
        id: 'ai-platforms',
        type: 'parent',
        title: 'AI Platforms',
        icon: '+',
        children: []
    },
    {
        id: 'safety-governance',
        type: 'parent',
        title: 'Safety & Governance',
        icon: '+',
        children: []
    }
];