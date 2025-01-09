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
                icon: '/assets/icons8-microsoft-copilot-50.png',
                parentId: 'generative-ai',

            },
            {
                id: 'chatgpt',
                type: 'sub',
                title: 'ChatGPT',
                icon: '/assets/icons8-chatgpt-50.png',
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
                icon: '/assets/icons8-claude-50.png',
                parentId: 'generative-ai',
                children: [{
                    id: 'poc-technology',
                    type: 'sub2',
                    title: 'POC: TECHNOLOGY',
                    icon: '/assets/icons8-claude-50.png',
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
                icon: '/assets/icons8-teams-50 (1).png',
                parentId: 'productivity-ai',
                children: [{
                    id: 'pilot-executive',
                    type: 'sub2',
                    title: 'PILOT: EXECUTIVE',
                    icon: '/assets/icons8-teams-50 (1).png',
                    parentId: 'ms-teams'
                }]
            },
            {
                id: 'ms-teams-premium',
                type: 'sub',
                title: 'MS Teams Premium',
                icon: '/assets/icons8-teams-50 (1).png',
                parentId: 'productivity-ai',
            },
            {
                id: 'genesys-cloud',
                type: 'sub',
                title: 'Genesys Cloud',
                icon: '/assets/icons8-genesys-cloud-64.png',
                parentId: 'productivity-ai',
            },
            {
                id: 'dynamics365-copilot',
                type: 'sub',
                title: '/assets/icons8-chatbot-50.png',
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
                icon: '/assets/icons8-chatbot-50.png',
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
                icon: '/assets/icons8-list-50.png',
                parentId: 'ai-safety',
                children: [{
                    id: 'copilot-red-team',
                    type: 'sub2',
                    title: 'CoPilot Red Team',
                    icon: '/assets/icons8-burglar-32.png',
                    parentId: 'copilot-readiness'
                }]
            },
            {
                id: 'ms-purview',
                type: 'sub',
                title: 'MS Purview',
                icon: '/assets/icons8-eye-64.png',
                parentId: 'ai-safety',
            },
            {
                id: 'ai-policy',
                type: 'sub',
                title: 'AI Policy & Governance Model',
                icon: '/assets/icons8-report-50.png',
                parentId: 'ai-safety',
                children: [{
                    id: 'ai-tool-register',
                    type: 'sub2',
                    title: 'AI Tool Register',
                    icon: '/assets/icons8-list-64.png',
                    parentId: 'ai-policy'
                }]
            },
            {
                id: 'ai-lms',
                type: 'sub',
                title: 'AI LMS',
                icon: '/assets/icons8-learning-50.png',
                parentId: 'ai-safety',
                children: [{
                    id: 'ai-lms-rollout',
                    type: 'sub2',
                    title: 'AI LMS Knowledge Worker Rollout',
                    icon: '/assets/icons8-business-man.png',
                    parentId: 'ai-lms'
                }]
            },
            {
                id: 'ms-purview-extension',
                type: 'sub',
                title: 'MS Purview Browser Extension',
                icon: '/assets/icons8-eye-64.png',
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