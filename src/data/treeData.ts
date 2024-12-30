import {TreeNode} from "../types/tree";

export const treeData: TreeNode[] = [
    {
        id: 'generative-ai',
        type: 'parent',
        title: 'Generative AI',
        icon: 'brain',
        children: [
            {
                id: 'prompt-engineering',
                type: 'sub',
                title: 'Prompt Engineering',
                icon: 'code',
                swimLane: 'enable',
                children: [
                    {
                        id: 'prompt-templates',
                        type: 'sub2',
                        title: 'Prompt Templates',
                        icon: 'template',
                        swimLane: 'enable'
                    }
                ]
            }
        ]
    },
    {
        id: 'productivity-ai',
        type: 'parent',
        title: 'Productivity AI',
        icon: 'tool',
        children: [/* similar structure */]
    },
    {
        id: 'ai-platforms',
        type: 'parent',
        title: 'AI Platforms',
        icon: 'server',
        children: [/* similar structure */]
    },
    {
        id: 'safety-governance',
        type: 'parent',
        title: 'Safety & Governance',
        icon: 'shield',
        children: [/* similar structure */]
    }
];