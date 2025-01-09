// src/components/nodes/NodeTree.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { TreeNode as TreeNodeType, Position } from '../../types/tree';
import { TreeNodeComponent } from './TreeNode';
import { TreeConnector } from '../connectors/TreeConnector';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface NodeTreeProps {
    node: TreeNodeType;
    position: Position;
    index: number;
    getNodePosition: (node: TreeNodeType, index: number) => Position;
    onAddClick: (parentId: string, nodeType: 'sub' | 'sub2') => void;
    showButtons?: boolean;
}

export function NodeTree({
                             node,
                             position,
                             index,
                             getNodePosition,
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
            />

            {showAddButtons && (
                <foreignObject
                    x={position.x - 60}
                    y={position.y + 80}
                    width="120"
                    height="80"
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {canAddSub && (
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<AddCircleOutlineIcon />}
                                onClick={() => onAddClick(node.id, 'sub')}
                                style={{
                                    backgroundColor: '#1976d2',
                                    color: 'white',
                                    textTransform: 'none',
                                    width: '100%'
                                }}
                            >
                                Add Sub
                            </Button>
                        )}
                        {canAddSub2 && (
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<AddCircleOutlineIcon />}
                                onClick={() => onAddClick(node.id, 'sub2')}
                                style={{
                                    backgroundColor: '#1976d2',
                                    color: 'white',
                                    textTransform: 'none',
                                    width: '100%'
                                }}
                            >
                                Add Sub-2
                            </Button>
                        )}
                    </div>
                </foreignObject>
            )}

            {node.children?.map((child) => {
                const childPos = getNodePosition(child, index);

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
                        />
                        <NodeTree
                            node={child}
                            position={childPos}
                            index={index}
                            getNodePosition={getNodePosition}
                            onAddClick={onAddClick}
                            showButtons={showButtons}
                        />
                    </motion.g>
                );
            })}
        </g>
    );
}