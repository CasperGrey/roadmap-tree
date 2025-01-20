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

    const getConnectionType = (parentNode: TreeNodeType, childNode: TreeNodeType): 'vertical' | 'sequential' | 'sub2' => {
        if (childNode.type === 'sub2') {
            return 'sub2';
        }
        if (parentNode.type === 'parent' && !childNode.prevSiblingId) {
            return 'vertical';
        }
        return 'sequential';
    };

    return (
        <g>
            <TreeNodeComponent
                node={node}
                position={position}
                onNodeClick={onNodeClick}
            />

            {node.children?.map((child, childIndex) => {
                const childPos = getNodePosition(child, index);

                if (!childPos) {
                    console.error('Failed to get position for child:', child);
                    return null;
                }

                return (
                    <motion.g
                        key={child.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <TreeConnector
                            start={position}
                            end={childPos}
                            nodeType={child.type}
                            connectionType={getConnectionType(node, child)}
                        />
                        <NodeTree
                            node={child}
                            position={childPos}
                            index={childIndex}
                            getNodePosition={getNodePosition}
                            onNodeClick={onNodeClick}
                            onAddClick={onAddClick}
                            showButtons={showButtons}
                        />
                    </motion.g>
                );
            })}

            {showAddButtons && (
                <g>
                    {canAddSub && (
                        <Button
                            onClick={() => onAddClick?.(node.id, 'sub')}
                            startIcon={<AddCircleOutlineIcon />}
                        >
                            Add Sub
                        </Button>
                    )}
                    {canAddSub2 && (
                        <Button
                            onClick={() => onAddClick?.(node.id, 'sub2')}
                            startIcon={<AddCircleOutlineIcon />}
                        >
                            Add Sub2
                        </Button>
                    )}
                </g>
            )}
        </g>
    );
}