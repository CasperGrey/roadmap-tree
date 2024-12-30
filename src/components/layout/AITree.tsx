import React, { useState, useEffect, useRef } from 'react';
import { TreeNode as TreeNodeType } from '../../types/tree';
import { TreeNodeComponent } from '../nodes/TreeNode';
import { TreeConnector } from '../connectors/TreeConnector';
import { SwimLanes } from './SwimLanes';

export default function AITree({ data }: { data: TreeNodeType[] }) {
    const [treeHeight, setTreeHeight] = useState(0);
    const treeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (treeRef.current) {
            setTreeHeight(treeRef.current.getBoundingClientRect().height);
        }
    }, [data]);

    const getNodePosition = (node: TreeNodeType) => {
        let x = 0;
        if (node.type === 'parent') {
            x = 200;
        } else if (node.type === 'sub') {
            x = 400;
        } else {
            x = 600;
        }

        let y = 0;
        if (node.swimLane) {
            const laneHeight = treeHeight / 3;
            const laneIndex = ['enable', 'engage', 'evolve'].indexOf(node.swimLane);
            y = (laneHeight * laneIndex) + (laneHeight / 2);
        }

        return { x, y };
    };

    return (
        <div className="relative" ref={treeRef}>
            <SwimLanes height={treeHeight} />

            <svg className="w-full" style={{ height: treeHeight }}>
                {data.map(parentNode => {
                    const pos = getNodePosition(parentNode);
                    return (
                        <g key={parentNode.id}>
                            <TreeNodeComponent
                                node={parentNode}
                                position={pos}
                            />

                            {parentNode.children?.map(childNode => {
                                const childPos = getNodePosition(childNode);
                                return (
                                    <g key={childNode.id}>
                                        <TreeConnector
                                            start={pos}
                                            end={childPos}
                                        />
                                        <TreeNodeComponent
                                            node={childNode}
                                            position={childPos}
                                        />
                                    </g>
                                );
                            })}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
