// src/components/nodes/NodeTree.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { TreeNode as TreeNodeType, Position, NodeType } from '../../types/tree';
import { TreeNodeComponent } from './TreeNode';
import { TreeConnector } from '../connectors/TreeConnector';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface NodeTreeProps {
    node: TreeNodeType;
    position: Position;
    index: number;
    getNodePosition: (node: TreeNodeType, index: number) => Position;
    onNodeClick: (node: TreeNodeType) => void;
    onAddClick?: (parentId: string, nodeType: 'sub' | 'sub2') => void;
    showButtons?: boolean;
}

export function NodeTree({
                             node,
                             position,
                             index,
                             getNodePosition,
                             onNodeClick,
                             onAddClick,
                             showButtons = false
                         }: NodeTreeProps) {
    const showAddButtons = showButtons && (node.type === 'parent' || node.type === 'sub');
    const canAddSub = node.type === 'parent';
    const canAddSub2 = node.type === 'sub';

    return (
        <g>
            <TreeNodeComponent
                node={node}
                position={position}
                onNodeClick={onNodeClick}
            />

            {node.children?.map((child) => {
                const childPos = getNodePosition(child, index);

                if (!childPos) {
                    console.error('Failed to get position for child:', child);
                    return null;
                }

                return (
                    <motion.g
                        key={child.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <TreeConnector
                            start={position}
                            end={childPos}
                            nodeType={child.type}
                            connectionType={!child.prevSiblingId && child.type === 'sub' ? 'vertical' : child.type === 'sub2' ? 'sub2' : 'sequential'}
                        />

                        <NodeTree
                            node={child}
                            position={childPos}
                            index={index}
                            getNodePosition={getNodePosition}
                            onNodeClick={onNodeClick}
                            onAddClick={onAddClick}
                            showButtons={showButtons}
                        />
                    </motion.g>
                );
            })}

            {showAddButtons && onAddClick && (
                <foreignObject
                    x={position.x - 60}
                    y={position.y + 80}
                    width="120"
                    height="80"
                >
                    <div className="flex flex-col gap-2">
                        {canAddSub && (
                            <button
                                onClick={() => onAddClick(node.id, 'sub')}
                                className="px-2 py-1 bg-[#204B87] hover:bg-[#2b5ca6] text-white rounded
                                         transition-colors border border-white/20 text-sm"
                            >
                                Add Sub
                            </button>
                        )}
                        {canAddSub2 && (
                            <button
                                onClick={() => onAddClick(node.id, 'sub2')}
                                className="px-2 py-1 bg-[#204B87] hover:bg-[#2b5ca6] text-white rounded
                                         transition-colors border border-white/20 text-sm"
                            >
                                Add Sub-2
                            </button>
                        )}
                    </div>
                </foreignObject>
            )}
        </g>
    );
}