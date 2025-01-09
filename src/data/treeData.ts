// src/data/treeData.ts
import { TreeNode } from '../types/tree';

export const treeData: TreeNode[] = [
    {
        id: 'generative-ai',
        type: 'parent',
        title: 'Generative AI',
        icon: 'brain',
        children: [
            {
                id: 'copilot-studio',
                type: 'sub',
                title: 'Copilot Studio in Edge',
                icon: 'robot',
                parentId: 'generative-ai',
                children: [{
                    id: 'pilot-pr',
                    type: 'sub2',
                    title: 'PILOT: PR',
                    icon: '/assets/icons8-microsoft-copilot-50.png',
                    parentId: 'copilot-studio'
                }]
            },
            {
                id: 'chatgpt',
                type: 'sub',
                title: 'ChatGPT',
                icon: 'comments',
                parentId: '/assets/icons8-chatgpt-50.png',
            },
            {
                id: '365-copilot-audit',
                type: 'sub',
                title: '365 COPILOT AUDIT',
                icon: '/assets/icons8-microsoft-copilot-50.png',
                parentId: 'generative-ai',
            },
            {
                id: 'claude-ai',
                type: 'sub',
                title: 'CLAUDE AI',
                icon: 'robot',
                parentId: 'generative-ai',
                children: [{
                    id: 'poc-technology',
                    type: 'sub2',
                    title: 'POC: TECHNOLOGY',
                    icon: 'microchip',
                    parentId: 'claude-ai'
                }]
            }
        ]
    },
    {
        id: 'productivity-ai',
        type: 'parent',
        title: 'Productivity AI',
        icon: 'bolt',
        children: [
            {
                id: 'ms-teams',
                type: 'sub',
                title: 'MS Teams',
                icon: 'users',
                parentId: 'productivity-ai',
                children: [{
                    id: 'pilot-executive',
                    type: 'sub2',
                    title: 'PILOT: EXECUTIVE',
                    icon: 'user-tie',
                    parentId: 'ms-teams'
                }]
            },
            {
                id: 'ms-teams-premium',
                type: 'sub',
                title: 'MS Teams Premium',
                icon: 'star',
                parentId: 'productivity-ai',
            },
            {
                id: 'genesys-cloud',
                type: 'sub',
                title: 'Genesys Cloud',
                icon: 'cloud',
                parentId: 'productivity-ai',
            },
            {
                id: 'dynamics365-copilot',
                type: 'sub',
                title: 'Dynamics365 Copilot',
                icon: 'cogs',
                parentId: 'productivity-ai',
            }
        ]
    },
    {
        id: 'developed-ai',
        type: 'parent',
        title: 'Developed AI',
        icon: 'code',
        children: [
            {
                id: 'azure-foundry',
                type: 'sub',
                title: 'Azure Foundry POC',
                icon: 'cloud',
                parentId: 'developed-ai',
            },
            {
                id: 'knowledge-management',
                type: 'sub',
                title: 'Knowledge Management POC',
                icon: 'book',
                parentId: 'developed-ai',
            }
        ]
    },
    {
        id: 'ai-safety',
        type: 'parent',
        title: 'AI Safety & Security',
        icon: 'shield-alt',
        children: [
            {
                id: 'copilot-readiness',
                type: 'sub',
                title: 'MS Copilot Readiness Assessment',
                icon: 'clipboard-list',
                parentId: 'ai-safety',
                children: [{
                    id: 'copilot-red-team',
                    type: 'sub2',
                    title: 'CoPilot Red Team',
                    icon: 'users-cog',
                    parentId: 'copilot-readiness'
                }]
            },
            {
                id: 'ms-purview',
                type: 'sub',
                title: 'MS Purview',
                icon: 'shield-check',
                parentId: 'ai-safety',
            },
            {
                id: 'ai-policy',
                type: 'sub',
                title: 'AI Policy & Governance Model',
                icon: 'file-contract',
                parentId: 'ai-safety',
                children: [{
                    id: 'ai-tool-register',
                    type: 'sub2',
                    title: 'AI Tool Register',
                    icon: 'clipboard-list',
                    parentId: 'ai-policy'
                }]
            },
            {
                id: 'ai-lms',
                type: 'sub',
                title: 'AI LMS',
                icon: 'graduation-cap',
                parentId: 'ai-safety',
                children: [{
                    id: 'ai-lms-rollout',
                    type: 'sub2',
                    title: 'AI LMS Knowledge Worker Rollout',
                    icon: 'users',
                    parentId: 'ai-lms'
                }]
            },
            {
                id: 'ms-purview-extension',
                type: 'sub',
                title: 'MS Purview Browser Extension',
                icon: 'puzzle-piece',
                parentId: 'ai-safety',
            },
            {
                id: 'ai-monitoring',
                type: 'sub',
                title: 'AI Monitoring & Audits',
                icon: 'chart-line',
                parentId: 'ai-safety',
            },
            {
                id: 'ai-transparency',
                type: 'sub',
                title: 'AI Transparency Report',
                icon: 'file-alt',
                parentId: 'ai-safety',
            }
        ]
    }
];