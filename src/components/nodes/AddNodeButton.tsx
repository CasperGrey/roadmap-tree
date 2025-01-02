import React from 'react';
import { SwimLane, Position } from '../../types/tree';

interface AddNodeButtonProps {
    parentId: string;
    position: Position;
    selectedLane: SwimLane;
    onLaneChange: (lane: SwimLane) => void;
    onAddClick: () => void;
}

export function AddNodeButton({
                                  parentId,
                                  position,
                                  selectedLane,
                                  onLaneChange,
                                  onAddClick
                              }: AddNodeButtonProps) {
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
                    onChange={(e) => onLaneChange(e.target.value as SwimLane)}
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
                    onClick={onAddClick}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add
                </button>
            </div>
        </foreignObject>
    );
}