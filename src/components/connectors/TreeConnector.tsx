import React from 'react';

interface TreeConnectorProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
}

export function TreeConnector({ start, end }: TreeConnectorProps) {
  return (
      <line
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          stroke="white"
          strokeWidth="2"
      />
  );
}