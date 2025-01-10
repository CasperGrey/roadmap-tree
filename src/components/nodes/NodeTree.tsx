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
    onNodeClick: (node: TreeNodeType) => void;
    showButtons?: boolean;
}

export function NodeTree({
                             node,
                             position,
                             index,
                             getNodePosition,
                             onAddClick,
                             onNodeClick,
                             showButtons = false
                         }: NodeTreeProps) {
    // Debug: Log node hierarchy
    console.log('Rendering node:', {
        id: node.id,
        type: node.type,
        childCount: node.children?.length || 0,
        position
    });

    const showAddButtons = showButtons && (node.type === 'parent' || node.type === 'sub');
    const canAddSub = node.type === 'parent';
    const canAddSub2 = node.type === 'sub';

    // Function to determine if node is a direct child
    const isDirectChild = (parent: TreeNodeType, child: TreeNodeType) => {
        return child.parentId === parent.id;
    };

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

                // Debug: Log connection details
                console.log('Creating connection:', {
                    from: node.id,
                    to: child.id,
                    fromType: node.type,
                    toType: child.type,
                    fromPos: position,
                    toPos: childPos,
                    isDirectChild: isDirectChild(node, child)
                });

                return (
                    <motion.g
                        key={child.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Connection line with debug info */}
                        <TreeConnector
                            start={position}
                            end={childPos}
                            nodeType={child.type}
                        />

                        {/* Debug: Add connection points */}
                        <circle
                            cx={position.x}
                            cy={position.y + (node.type === 'parent' ? 45 : 40)}
                            r="3"
                            fill="blue"
                            opacity="0.5"
                        />
                        <circle
                            cx={childPos.x}
                            cy={childPos.y - (child.type === 'sub2' ? 35 : 40)}
                            r="3"
                            fill="yellow"
                            opacity="0.5"
                        />

                        {/* Recursive node rendering */}
                        <NodeTree
                            node={child}
                            position={childPos}
                            index={index}
                            getNodePosition={getNodePosition}
                            onAddClick={onAddClick}
                            onNodeClick={onNodeClick}
                            showButtons={showButtons}
                        />
                    </motion.g>
                );
            })}

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
        </g>
    );
}