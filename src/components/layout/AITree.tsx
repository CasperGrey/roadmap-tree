// src/components/layout/AITree.tsx
import React from 'react';
import { TreeNode as TreeNodeType } from '../../types/tree';
import { TreeNodeComponent } from '../nodes/TreeNode';
import { TreeConnector } from '../connectors/TreeConnector';
import { SwimLanes } from './SwimLanes';

interface Position {
    x: number;
    y: number;
}

export default function AITree({ data }: { data: TreeNodeType[] }) {
    const getParentPosition = (parentId?: string): Position => {
        if (!parentId) return { x: 0, y: 0 };
        const parentNode = data.find(node => node.id === parentId);
        if (!parentNode) return { x: 0, y: 0 };
        const parentIndex = data.indexOf(parentNode);
        return getNodePosition(parentNode, parentIndex);
    };

    const getNodePosition = (node: TreeNodeType, index: number): Position => {
        if (node.type === 'parent') {
            const spacing = 2241.46 / 5;
            return {
                x: spacing + (index * spacing),
                y: 100
            };
        }
        if (node.type === 'sub' && node.parentId) {
            const laneHeight = 1337.12 / 3;
            const laneIndex = node.swimLane === 'enable' ? 0 : node.swimLane === 'engage' ? 1 : 2;
            const parentPos = getParentPosition(node.parentId);
            return {
                x: parentPos.x,
                y: (laneHeight * laneIndex) + (laneHeight / 2)
            };
        }
        if (node.type === 'sub2' && node.parentId) {
            const parentPos = getParentPosition(node.parentId);
            return {
                x: parentPos.x + 150,
                y: parentPos.y + 150
            };
        }
        return { x: 0, y: 0 };
    };



    return (
        <div
            className="relative"
            style={{
                left: '24px',
                width: '2241.46px',
                height: '1337.12px',
                marginTop: '-15px'
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 2241.46 1337.12"
            >
                <SwimLanes />

                {/* Render parent nodes */}
                {data.map((node, index) => (
                    <g key={node.id}>
                        <TreeNodeComponent
                            node={node}
                            position={getNodePosition(node, index)}
                        />

                        {/* Render child nodes */}
                        {node.children?.map((child) => {
                            const childPos = getNodePosition(child, index);
                            const parentPos = getNodePosition(node, index);

                            return (
                                <g key={child.id}>
                                    <TreeConnector
                                        start={parentPos}
                                        end={childPos}
                                    />
                                    <TreeNodeComponent
                                        node={child}
                                        position={childPos}
                                    />

                                    {/* Render sub2 nodes */}
                                    {child.children?.map((sub2) => {
                                        const sub2Pos = getNodePosition(sub2, index);
                                        return (
                                            <g key={sub2.id}>
                                                <TreeConnector
                                                    start={childPos}
                                                    end={sub2Pos}
                                                />
                                                <TreeNodeComponent
                                                    node={sub2}
                                                    position={sub2Pos}
                                                />
                                            </g>
                                        );
                                    })}
                                </g>
                            );
                        })}
                    </g>
                ))}
            </svg>
        </div>
    );
}