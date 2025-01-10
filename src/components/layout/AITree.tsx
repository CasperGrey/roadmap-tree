// src/components/layout/AITree.tsx
import React, { useState, ReactElement } from 'react';
import { NodeTree } from '../nodes/NodeTree';
import { TreeNode, NodeType } from '../../types/tree';
import { SidePanel } from '../panels/SidePanel';
import { treeData as initialTreeData } from '../../data/treeData';
import { calculateNodePosition } from '../../utils/treePositionUtils';
import ReactDOM from 'react-dom';

interface AITreeProps {
    startY?: number;
    showButtons?: boolean;
}

type SelectableNodeType = Extract<NodeType, 'sub' | 'sub2'>;

const AITree = ({ startY = 800, showButtons = false }: AITreeProps): ReactElement => {
    const [treeData, setTreeData] = useState<TreeNode[]>(initialTreeData);
    const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

    const getNodePos = (node: TreeNode, index: number) => {
        return calculateNodePosition(node, index, treeData, { startY });
    };

    const handleNodeClick = (node: TreeNode) => {
        console.log('Opening panel for node:', node);
        setSelectedNode(node);
    };

    const renderSidePanel = () => {
        const panelRoot = document.getElementById('panel-root');
        if (!panelRoot) return null;

        return ReactDOM.createPortal(
            <SidePanel
                node={selectedNode}
                onClose={() => {
                    console.log('Closing panel');
                    setSelectedNode(null);
                }}
            />,
            panelRoot
        );
    };

    return (
        <>
            <g>
                {treeData.map((node, index) => (
                    <NodeTree
                        key={node.id}
                        node={node}
                        position={getNodePos(node, index)}
                        index={index}
                        getNodePosition={getNodePos}
                        onNodeClick={handleNodeClick}
                        showButtons={showButtons}
                    />
                ))}
            </g>
            {renderSidePanel()}
        </>
    );
};

export default AITree;