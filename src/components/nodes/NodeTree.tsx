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
    onAddClick: (parentId: string, nodeType: 'sub' | 'sub2') => void;
}

export function NodeTree({
                             node,
                             position,
                             index,
                             getNodePosition,
                             onAddClick
                         }: NodeTreeProps) {
    const showAddButtons = node.type === 'parent' || node.type === 'sub';
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
                    <div className="space-y-2">
                        {canAddSub && (
                            <button
                                className="w-full flex items-center justify-center gap-2 bg-node-blue
                                         hover:bg-opacity-80 text-white rounded-md px-4 py-2"
                                onClick={() => onAddClick(node.id, 'sub')}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Sub
                            </button>
                        )}
                        {canAddSub2 && (
                            <button
                                className="w-full flex items-center justify-center gap-2 bg-node-blue
                                         hover:bg-opacity-80 text-white rounded-md px-4 py-2"
                                onClick={() => onAddClick(node.id, 'sub2')}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Sub-2
                            </button>
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
                        <g transform={`translate(${childPos.x}, ${childPos.y})`}>
                            <NodeTree
                                node={child}
                                position={{ x: 0, y: 0 }}
                                index={index}
                                getNodePosition={getNodePosition}
                                onAddClick={onAddClick}
                            />
                        </g>
                    </motion.g>
                );
            })}
        </g>
    );
}