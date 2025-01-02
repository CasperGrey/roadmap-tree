// src/components/layout/AITree.tsx
import React, { useCallback, useState } from 'react';
import { TreeNode as TreeNodeType, SwimLane, Position } from '../../types/tree';
import { TreeNodeComponent } from '../nodes/TreeNode';
import { TreeConnector } from '../connectors/TreeConnector';
import { SwimLanes } from './SwimLanes';
import { AddNodeModal } from '../nodes/AddNodeModal';
import { motion } from 'framer-motion';

interface AITreeProps {
    data: TreeNodeType[];
    onAddNode: (nodeData: Omit<TreeNodeType, 'id' | 'children'>) => void;
}

export default function AITree({ data, onAddNode }: AITreeProps) {
    const [zoom, setZoom] = useState(1);
    const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 2241.46, height: 1337.12 });
    const [selectedLanes, setSelectedLanes] = useState<Record<string, SwimLane>>({});
    const [activeParentId, setActiveParentId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleWheel = useCallback((event: React.WheelEvent) => {
        event.preventDefault();
        const zoomFactor = event.deltaY > 0 ? 1.1 : 0.9;
        const newZoom = zoom * zoomFactor;
        if (newZoom < 0.5 || newZoom > 3) return;

        const newWidth = viewBox.width * zoomFactor;
        const newHeight = viewBox.height * zoomFactor;
        const mouseX = event.nativeEvent.offsetX;
        const mouseY = event.nativeEvent.offsetY;
        const newX = viewBox.x + (mouseX / zoom) * (1 - zoomFactor);
        const newY = viewBox.y + (mouseY / zoom) * (1 - zoomFactor);

        setZoom(newZoom);
        setViewBox({
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight
        });
    }, [zoom, viewBox]);

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

    const AddNodeButton = ({ parentId, position }: { parentId: string, position: Position }) => {
        const selectedLane = selectedLanes[parentId] || 'enable';

        return (
            <foreignObject
                x={position.x - 120}
                y={position.y + 80}
                width="240"
                height="40"
            >
                <div className="flex gap-2">
                    <select
                        value={selectedLane}
                        onChange={(e) => setSelectedLanes(prev => ({
                            ...prev,
                            [parentId]: e.target.value as SwimLane
                        }))}
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
                        onClick={() => {
                            setActiveParentId(parentId);
                            setIsModalOpen(true);
                        }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add
                    </button>
                </div>
            </foreignObject>
        );
    };

    return (
        <>
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
                    viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
                    onWheel={handleWheel}
                >
                    <SwimLanes />

                    {data.map((node, index) => (
                        <g key={node.id}>
                            <TreeNodeComponent
                                node={node}
                                position={getNodePosition(node, index)}
                            />

                            {node.type === 'parent' && (
                                <AddNodeButton
                                    parentId={node.id}
                                    position={getNodePosition(node, index)}
                                />
                            )}

                            {node.children?.map((child) => {
                                const childPos = getNodePosition(child, index);
                                const parentPos = getNodePosition(node, index);

                                return (
                                    <motion.g
                                        key={child.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <TreeConnector
                                            start={parentPos}
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
                    ))}
                </svg>
            </div>

            {activeParentId && (
                <AddNodeModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setActiveParentId(null);
                    }}
                    onAdd={(nodeData) => {
                        onAddNode(nodeData);
                        setIsModalOpen(false);
                        setActiveParentId(null);
                    }}
                    parentId={activeParentId}
                    selectedLane={selectedLanes[activeParentId] || 'enable'}
                    existingNodes={data}
                />
            )}
        </>
    );
}