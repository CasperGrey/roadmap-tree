// src/components/nodes/NodeTree.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { TreeNode as TreeNodeType, Position, SwimLane } from '../../types/tree';
import { TreeNodeComponent } from './TreeNode';
import { TreeConnector } from '../connectors/TreeConnector';

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
    // Allow adding nodes to both parent and sub types
    const showAddButton = node.type === 'parent' || node.type === 'sub';

    return (
        <g key={node.id}>
            <TreeNodeComponent
                node={node}
                position={position}
            />

            {showAddButton && (
                <foreignObject
                    x={position.x - 120}
                    y={position.y + 80}
                    width="240"
                    height="40"
                >
                    <div className="flex gap-2">
                        <select
                            value={selectedLane}
                            onChange={(e) => onLaneChange(node.id, e.target.value as SwimLane)}
                            className="w-32 px-3 py-2 bg-node-blue bg-opacity-50 text-white rounded-md
                                     border border-white border-opacity-20 focus:border-opacity-50
                                     focus:outline-none capitalize"
                        >
                            <option value="enable">Enable</option>
                            <option value="engage">Engage</option>
                            <option value="evolve">Evolve</option>
                        </select>
                        <button
                            className="flex-1 flex items-center justify-center gap-2 bg-node-blue
                                     hover:bg-opacity-80 text-white rounded-md px-4 py-2"
                            onClick={() => onAddClick(node.id)}
                        >
                            Add Node
                        </button>
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
                        />
                        <NodeTree
                            node={child}
                            position={childPos}
                            index={index}
                            getNodePosition={getNodePosition}
                            selectedLane={selectedLane}
                            onLaneChange={onLaneChange}
                            onAddClick={onAddClick}
                        />
                    </motion.g>
                );
            })}
        </g>
    );
}