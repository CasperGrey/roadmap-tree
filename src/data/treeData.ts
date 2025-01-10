// src/data/treeData.ts
import { TreeNode } from '../types/tree';

export const treeData: TreeNode[] = [
    {
        id: 'generative-ai',
        type: 'parent',
        title: 'Generative AI',
        icon: '/assets/icons8-ai-50.png',
        description: 'Our Generative AI initiative focuses on implementing and leveraging various AI models and tools.',
        parentId: 'root',
        children: [
            {
                id: 'copilot-studio',
                type: 'sub',
                title: 'Copilot Studio in Edge',
                icon: '/assets/icons8-microsoft-copilot-50.png',
                description: 'Implementation of Microsoft Copilot Studio in Edge browser.',
                parentId: 'generative-ai',
                nextSiblingId: 'chatgpt'
            },
            {
                id: 'chatgpt',
                type: 'sub',
                title: 'ChatGPT',
                icon: '/assets/icons8-chatgpt-50.png',
                description: 'Integration of ChatGPT capabilities.',
                parentId: 'generative-ai',
                prevSiblingId: 'copilot-studio',
                nextSiblingId: '365-copilot-audit',
                children: [{
                    id: 'pilot-pr',
                    type: 'sub2',
                    title: 'PILOT: COMMS & PR Team',
                    icon: '/assets/icons8-microsoft-copilot-50.png',
                    description: 'Pilot program for Communications and PR team.',
                    parentId: 'chatgpt'
                }]
            },
            {
                id: '365-copilot-audit',
                type: 'sub',
                title: '365 COPILOT AUDIT',
                icon: '/assets/icons8-microsoft-copilot-50.png',
                description: 'Comprehensive audit of Microsoft 365 Copilot implementation.',
                parentId: 'generative-ai',
                prevSiblingId: 'chatgpt',
                nextSiblingId: 'claude-ai'
            },
            {
                id: 'claude-ai',
                type: 'sub',
                title: 'CLAUDE AI',
                icon: '/assets/icons8-claude-50.png',
                description: 'Integration of Anthropics Claude AI.',
                parentId: 'generative-ai',
                prevSiblingId: '365-copilot-audit',
                children: [{
                    id: 'poc-technology',
                    type: 'sub2',
                    title: 'POC: EXECUTIVE',
                    icon: '/assets/icons8-claude-50.png',
                    description: 'Proof of concept for executive team.',
                    parentId: 'claude-ai'
                }]
            }
        ]
    },
    {
        id: 'productivity-ai',
        type: 'parent',
        title: 'Productivity AI',
        icon: '/assets/icons8-hard-working-64.png',
        description: 'Suite of AI-powered tools and solutions designed to enhance workplace efficiency.',
        parentId: 'root',
        children: [
            {
                id: 'ms-teams',
                type: 'sub',
                title: 'MS Teams',
                icon: '/assets/icons8-teams-50 (1).png',
                description: 'AI-enhanced Microsoft Teams implementation.',
                parentId: 'productivity-ai',
                nextSiblingId: 'ms-teams-premium',
                children: [{
                    id: 'pilot-executive',
                    type: 'sub2',
                    title: 'PILOT: KNOWLEDGE WORKERS',
                    icon: '/assets/icons8-teams-50 (1).png',
                    description: 'Pilot program for knowledge worker productivity.',
                    parentId: 'ms-teams'
                }]
            },
            {
                id: 'ms-teams-premium',
                type: 'sub',
                title: 'MS Teams Premium',
                icon: '/assets/icons8-teams-50 (1).png',
                description: 'Advanced Teams features including AI-powered insights.',
                parentId: 'productivity-ai',
                prevSiblingId: 'ms-teams',
                nextSiblingId: 'genesys-cloud'
            },
            {
                id: 'genesys-cloud',
                type: 'sub',
                title: 'Genesys Cloud',
                icon: '/assets/icons8-genesys-cloud-64.png',
                description: 'Implementation of Genesys Cloud with AI capabilities.',
                parentId: 'productivity-ai',
                prevSiblingId: 'ms-teams-premium',
                nextSiblingId: 'dynamics365-copilot'
            },
            {
                id: 'dynamics365-copilot',
                type: 'sub',
                title: 'DYNAMICS COPILOT',
                icon: '/assets/icons8-chatbot-50.png',
                description: 'Integration of Copilot features in Dynamics 365.',
                parentId: 'productivity-ai',
                prevSiblingId: 'genesys-cloud'
            }
        ]
    },
    {
        id: 'developed-ai',
        type: 'parent',
        title: 'Developed AI',
        icon: '/assets/icons8-developer-64.png',
        description: 'Custom AI solutions developed in-house.',
        parentId: 'root',
        children: [
            {
                id: 'azure-foundry',
                type: 'sub',
                title: 'Azure Foundry POC',
                icon: 'cloud',
                description: 'Proof of concept for Azure-based AI development.',
                parentId: 'developed-ai',
                nextSiblingId: 'knowledge-management'
            },
            {
                id: 'knowledge-management',
                type: 'sub',
                title: 'Knowledge Management POC',
                icon: '/assets/icons8-chatbot-50.png',
                description: 'AI-powered knowledge management system.',
                parentId: 'developed-ai',
                prevSiblingId: 'azure-foundry'
            }
        ]
    },
    {
        id: 'ai-safety',
        type: 'parent',
        title: 'AI Safety & Security',
        icon: '/assets/icons8-safety-50.png',
        description: 'Framework for safe and responsible AI implementation.',
        parentId: 'root',
        children: [
            {
                id: 'copilot-readiness',
                type: 'sub',
                title: 'MS Copilot Readiness Assessment',
                icon: '/assets/icons8-list-50.png',
                description: 'Assessment program for Microsoft Copilot readiness.',
                parentId: 'ai-safety',
                nextSiblingId: 'ms-purview',
                children: [{
                    id: 'copilot-red-team',
                    type: 'sub2',
                    title: 'CoPilot Red Team',
                    icon: '/assets/icons8-burglar-32.png',
                    description: 'Security testing team for Copilot implementations.',
                    parentId: 'copilot-readiness'
                }]
            },
            {
                id: 'ms-purview',
                type: 'sub',
                title: 'MS Purview',
                icon: '/assets/icons8-eye-64.png',
                description: 'Implementation of Microsoft Purview.',
                parentId: 'ai-safety',
                prevSiblingId: 'copilot-readiness',
                nextSiblingId: 'ai-policy'
            },
            {
                id: 'ai-policy',
                type: 'sub',
                title: 'AI Policy & Governance Model',
                icon: '/assets/icons8-report-50.png',
                description: 'Development of AI governance framework.',
                parentId: 'ai-safety',
                prevSiblingId: 'ms-purview',
                nextSiblingId: 'ai-lms',
                children: [{
                    id: 'ai-tool-register',
                    type: 'sub2',
                    title: 'AI Tool Register',
                    icon: '/assets/icons8-list-64.png',
                    description: 'Centralized registry for AI tools.',
                    parentId: 'ai-policy'
                }]
            },
            {
                id: 'ai-lms',
                type: 'sub',
                title: 'AI LMS',
                icon: '/assets/icons8-learning-50.png',
                description: 'Learning Management System for AI education.',
                parentId: 'ai-safety',
                prevSiblingId: 'ai-policy',
                nextSiblingId: 'ms-purview-extension',
                children: [{
                    id: 'ai-lms-rollout',
                    type: 'sub2',
                    title: 'AI LMS Knowledge Worker Rollout',
                    icon: '/assets/icons8-business-man.png',
                    description: 'Rollout of AI training programs.',
                    parentId: 'ai-lms'
                }]
            },
            {
                id: 'ms-purview-extension',
                type: 'sub',
                title: 'MS Purview Browser Extension',
                icon: '/assets/icons8-eye-64.png',
                description: 'Browser extension for Microsoft Purview.',
                parentId: 'ai-safety',
                prevSiblingId: 'ai-lms',
                nextSiblingId: 'ai-monitoring'
            },
            {
                id: 'ai-monitoring',
                type: 'sub',
                title: 'AI Monitoring & Audits',
                icon: 'chart-line',
                description: 'Continuous monitoring of AI systems.',
                parentId: 'ai-safety',
                prevSiblingId: 'ms-purview-extension',
                nextSiblingId: 'ai-transparency'
            },
            {
                id: 'ai-transparency',
                type: 'sub',
                title: 'AI Transparency Report',
                icon: 'file-alt',
                description: 'Regular reporting on AI usage and compliance.',
                parentId: 'ai-safety',
                prevSiblingId: 'ai-monitoring'
            }
        ]
    }
];