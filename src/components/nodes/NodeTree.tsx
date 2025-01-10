// src/components/nodes/NodeTree.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { TreeNode as TreeNodeType, Position } from '../../types/tree';
import { TreeNodeComponent } from './TreeNode';
import { TreeConnector } from '../connectors/TreeConnector';

interface NodeTreeProps {
    node: TreeNodeType;
    position: Position;
    index: number;
    getNodePosition: (node: TreeNodeType, index: number) => Position;
    onNodeClick: (node: TreeNodeType) => void;
    showButtons?: boolean;  // Keeping this in case you want to add button functionality back later
}

export function NodeTree({
                             node,
                             position,
                             index,
                             getNodePosition,
                             onNodeClick,
                             showButtons = false
                         }: NodeTreeProps) {
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
                            connectionType={child.type === 'sub2' ? 'sub2' : 'sequential'}
                        />

                        <NodeTree
                            node={child}
                            position={childPos}
                            index={index}
                            getNodePosition={getNodePosition}
                            onNodeClick={onNodeClick}
                            showButtons={showButtons}
                        />
                    </motion.g>
                );
            })}
        </g>
    );
}