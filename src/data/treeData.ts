// src/data/treeData.ts
import { TreeNode } from '../types/tree';

export const treeData: TreeNode[] = [
    {
        id: 'generative-ai',
        type: 'parent',
        title: 'Generative AI',
        icon: '/assets/icons8-ai-50.png',
        description: 'Our Generative AI initiative focuses on implementing and leveraging various AI models and tools to enhance productivity and innovation across the organization.',
        children: [
            {
                id: 'copilot-studio',
                type: 'sub',
                title: 'Copilot Studio in Edge',
                icon: '/assets/icons8-microsoft-copilot-50.png',
                description: 'Implementation of Microsoft Copilot Studio in Edge browser to enhance workplace productivity and automate routine tasks.',
                parentId: 'generative-ai',
            },
            {
                id: 'chatgpt',
                type: 'sub',
                title: 'ChatGPT',
                icon: '/assets/icons8-chatgpt-50.png',
                description: 'Integration of ChatGPT capabilities to support various business functions and enhance communication workflows.',
                parentId: 'generative-ai',
                children: [{
                    id: 'pilot-pr',
                    type: 'sub2',
                    title: 'PILOT: COMMS & PR Team',
                    icon: '/assets/icons8-microsoft-copilot-50.png',
                    description: 'Pilot program for Communications and PR team to leverage AI tools in content creation and media relations.',
                    parentId: 'copilot-studio'
                }]
            },
            {
                id: '365-copilot-audit',
                type: 'sub',
                title: '365 COPILOT AUDIT',
                icon: '/assets/icons8-microsoft-copilot-50.png',
                description: 'Comprehensive audit of Microsoft 365 Copilot implementation to ensure security, compliance, and optimal usage.',
                parentId: 'generative-ai',
            },
            {
                id: 'claude-ai',
                type: 'sub',
                title: 'CLAUDE AI',
                icon: '/assets/icons8-claude-50.png',
                description: 'Integration of Anthropics Claude AI to provide advanced language processing and analytical capabilities.',
                parentId: 'generative-ai',
                children: [{
                    id: 'poc-technology',
                    type: 'sub2',
                    title: 'POC: EXECUTIVE',
                    icon: '/assets/icons8-claude-50.png',
                    description: 'Proof of concept implementation of Claude AI for executive team workflow enhancement and decision support.',
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
        description: 'Suite of AI-powered tools and solutions designed to enhance workplace efficiency and streamline business processes.',
        children: [
            {
                id: 'ms-teams',
                type: 'sub',
                title: 'MS Teams',
                icon: '/assets/icons8-teams-50 (1).png',
                description: 'AI-enhanced Microsoft Teams implementation with advanced collaboration and communication features.',
                parentId: 'productivity-ai',
                children: [{
                    id: 'pilot-executive',
                    type: 'sub2',
                    title: 'PILOT: KNOWLEDGE WORKERS',
                    icon: '/assets/icons8-teams-50 (1).png',
                    description: 'Pilot program focusing on implementing AI tools to enhance knowledge worker productivity in Teams environment.',
                    parentId: 'ms-teams'
                }]
            },
            {
                id: 'ms-teams-premium',
                type: 'sub',
                title: 'MS Teams Premium',
                icon: '/assets/icons8-teams-50 (1).png',
                description: 'Advanced Teams features including AI-powered meeting insights, enhanced security, and custom branding capabilities.',
                parentId: 'productivity-ai',
            },
            {
                id: 'genesys-cloud',
                type: 'sub',
                title: 'Genesys Cloud',
                icon: '/assets/icons8-genesys-cloud-64.png',
                description: 'Implementation of Genesys Cloud with AI capabilities for enhanced customer experience and contact center operations.',
                parentId: 'productivity-ai',
            },
            {
                id: 'dynamics365-copilot',
                type: 'sub',
                title: 'DYNAMICS COPILOT',
                icon: '/assets/icons8-chatbot-50.png',
                description: 'Integration of Copilot features in Dynamics 365 for improved CRM and business process automation.',
                parentId: 'productivity-ai',
            }
        ]
    },
    {
        id: 'developed-ai',
        type: 'parent',
        title: 'Developed AI',
        icon: '/assets/icons8-developer-64.png',
        description: 'Custom AI solutions developed in-house to address specific business needs and innovation opportunities.',
        children: [
            {
                id: 'azure-foundry',
                type: 'sub',
                title: 'Azure Foundry POC',
                icon: '/assets/icons8-power-50.png',
                description: 'Proof of concept for Azure-based AI development platform to streamline custom AI solution creation.',
                parentId: 'developed-ai',
            },
            {
                id: 'knowledge-management',
                type: 'sub',
                title: 'Knowledge Management POC',
                icon: '/assets/icons8-chatbot-50.png',
                description: 'Proof of concept for AI-powered knowledge management system to improve information access and sharing.',
                parentId: 'developed-ai',
            }
        ]
    },
    {
        id: 'ai-safety',
        type: 'parent',
        title: 'AI Safety & Security',
        icon: '/assets/icons8-safety-50.png',
        description: 'Comprehensive framework and initiatives to ensure safe, secure, and responsible AI implementation across the organization.',
        children: [
            {
                id: 'copilot-readiness',
                type: 'sub',
                title: 'MS Copilot Readiness Assessment',
                icon: '/assets/icons8-list-50.png',
                description: 'Assessment program to evaluate organizational readiness for Microsoft Copilot implementation.',
                parentId: 'ai-safety',
                children: [{
                    id: 'copilot-red-team',
                    type: 'sub2',
                    title: 'CoPilot Red Team',
                    icon: '/assets/icons8-burglar-32.png',
                    description: 'Dedicated team for security testing and vulnerability assessment of Copilot implementations.',
                    parentId: 'copilot-readiness'
                }]
            },
            {
                id: 'ms-purview',
                type: 'sub',
                title: 'MS Purview',
                icon: '/assets/icons8-eye-50.png',
                description: 'Implementation of Microsoft Purview for comprehensive data governance and risk management.',
                parentId: 'ai-safety',
            },
            {
                id: 'ai-policy',
                type: 'sub',
                title: 'AI Policy & Governance Model',
                icon: '/assets/icons8-report-50.png',
                description: 'Development and implementation of AI governance framework and policies for responsible AI use.',
                parentId: 'ai-safety',
                children: [{
                    id: 'ai-tool-register',
                    type: 'sub2',
                    title: 'AI Tool Register',
                    icon: '/assets/icons8-list-64.png',
                    description: 'Centralized registry for tracking and managing AI tools and applications across the organization.',
                    parentId: 'ai-policy'
                }]
            },
            {
                id: 'ai-lms',
                type: 'sub',
                title: 'AI LMS',
                icon: '/assets/icons8-learning-50.png',
                description: 'Learning Management System for AI education and training across the organization.',
                parentId: 'ai-safety',
                children: [{
                    id: 'ai-lms-rollout',
                    type: 'sub2',
                    title: 'AI LMS Knowledge Worker Rollout',
                    icon: '/assets/icons8-business-man.png',
                    description: 'Systematic rollout of AI training programs for knowledge workers across departments.',
                    parentId: 'ai-lms'
                }]
            },
            {
                id: 'ms-purview-extension',
                type: 'sub',
                title: 'MS Purview Browser Extension',
                icon: '/assets/icons8-eye-50.png',
                description: 'Browser extension for seamless integration of Microsoft Purview security features.',
                parentId: 'ai-safety',
            },
            {
                id: 'ai-monitoring',
                type: 'sub',
                title: 'AI Monitoring & Audits',
                icon: '/assets/icons8-audit-50.png',
                description: 'Continuous monitoring and regular auditing of AI systems for compliance and performance.',
                parentId: 'ai-safety',
            },
            {
                id: 'ai-transparency',
                type: 'sub',
                title: 'AI Transparency Report',
                icon: '/assets/icons8-report-50.png',
                description: 'Regular reporting on AI usage, impact, and compliance across the organization.',
                parentId: 'ai-safety',
            }
        ]
    }
];