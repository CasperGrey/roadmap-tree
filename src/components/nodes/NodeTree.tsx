import React from 'react';
import { motion } from 'framer-motion';
import { TreeNode as TreeNodeType, Position, SwimLane } from '../../types/tree';
import { TreeNodeComponent } from './TreeNode';
import { TreeConnector } from '../connectors/TreeConnector';
import { AddNodeButton } from './AddNodeButton';

interface NodeTreeProps {
    node: TreeNodeType;
    position: Position;
    index: number;
    getNodePosition: (node: TreeNodeType, index: number) => Position;
    selectedLane: SwimLane;
    onLaneChange: (parentId: string, lane: SwimLane) => void;
    onAddClick: (parentId: string) => void;
}

export function NodeTree({
                             node,
                             position,
                             index,
                             getNodePosition,
                             selectedLane,
                             onLaneChange,
                             onAddClick
                         }: NodeTreeProps) {
    return (
        <g key={node.id}>
            <TreeNodeComponent
                node={node}
                position={position}
            />

            {node.type === 'parent' && (
                <AddNodeButton
                    parentId={node.id}
                    position={position}
                    selectedLane={selectedLane}
                    onLaneChange={(lane) => onLaneChange(node.id, lane)}
                    onAddClick={() => onAddClick(node.id)}
                />
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
                        />
                        <TreeNodeComponent
                            node={child}
                            position={childPos}
                        />

                        {child.children?.map((sub2) => {
                            const sub2Pos = getNodePosition(sub2, index);
                            return (
                                <motion.g
                                    key={sub2.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <TreeConnector
                                        start={childPos}
                                        end={sub2Pos}
                                    />
                                    <TreeNodeComponent
                                        node={sub2}
                                        position={sub2Pos}
                                    />
                                </motion.g>
                            );
                        })}
                    </motion.g>
                );
            })}
        </g>
    );
}