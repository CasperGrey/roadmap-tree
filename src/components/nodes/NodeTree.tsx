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
    const showAddButtons = showButtons && (node.type === 'parent' || node.type === 'sub');
    const canAddSub = node.type === 'parent';
    const canAddSub2 = node.type === 'sub';

    // Render vertical connection (parent to first sub)
    const renderMainConnection = (child: TreeNodeType, childPos: Position) => {
        if (child.type === 'sub' && !child.prevSiblingId) {
            return (
                <TreeConnector
                    start={position}
                    end={childPos}
                    nodeType={child.type}
                    connectionType="vertical"
                />
            );
        }
        return null;
    };

    // Render sequential connections between sub nodes
    const renderSequentialConnections = (child: TreeNodeType, childPos: Position) => {
        if (child.type === 'sub' && child.prevSiblingId) {
            const prevSibling = node.children?.find(n => n.id === child.prevSiblingId);
            if (prevSibling) {
                const prevPos = getNodePosition(prevSibling, index);
                return (
                    <TreeConnector
                        start={prevPos}
                        end={childPos}
                        nodeType="sub"
                        connectionType="sequential"
                    />
                );
            }
        }
        return null;
    };

    // Render sub2 connections
    const renderSub2Connection = (child: TreeNodeType, childPos: Position) => {
        if (child.type === 'sub2') {
            return (
                <TreeConnector
                    start={position}
                    end={childPos}
                    nodeType="sub2"
                    connectionType="sub2"
                />
            );
        }
        return null;
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

                console.log('Connection details:', {
                    parent: {
                        id: node.id,
                        type: node.type,
                        position
                    },
                    child: {
                        id: child.id,
                        type: child.type,
                        position: childPos,
                        prevSibling: child.prevSiblingId,
                        nextSibling: child.nextSiblingId
                    }
                });

                return (
                    <motion.g
                        key={child.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Render appropriate connections based on node type */}
                        {renderMainConnection(child, childPos)}
                        {renderSequentialConnections(child, childPos)}
                        {renderSub2Connection(child, childPos)}

                        {/* Recursively render child node */}
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