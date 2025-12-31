'use client';

import { useState, useMemo, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const GRID_SIZE = 7;

// { point: number, pos: [row, col] }
const initialPoints = [
  { point: 1, pos: [0, 2] },
  { point: 2, pos: [3, 0] },
  { point: 3, pos: [4, 4] },
  { point: 4, pos: [5, 3] },
  { point: 5, pos: [4, 5] },
  { point: 6, pos: [4, 6] },
  { point: 7, pos: [3, 6] },
  { point: 8, pos: [1, 2] },
  { point: 9, pos: [1, 1] },
  { point: 10, pos: [2, 1] },
];

const walls = [
  // L-shape top right
  { from: [1, 3], to: [1, 4] },
  { from: [1, 4], to: [2, 4] },
  // L-shape bottom left
  { from: [4, 1], to: [4, 2] },
  { from: [4, 2], to: [5, 2] },
];

const checkWall = (from: [number, number], to: [number, number]) => {
  return walls.some(wall => 
    (wall.from[0] === from[0] && wall.from[1] === from[1] && wall.to[0] === to[0] && wall.to[1] === to[1]) ||
    (wall.from[0] === to[0] && wall.from[1] === to[1] && wall.to[0] === from[0] && wall.to[1] === from[1])
  );
}

interface ZipPuzzleProps {
    onSolve: () => void;
}

export default function ZipPuzzle({ onSolve }: ZipPuzzleProps) {
  const [path, setPath] = useState<[number, number][]>([initialPoints[0].pos]);
  const [solved, setSolved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const nextPointToFind = useMemo(() => {
    const lastPointInPath = path[path.length - 1];
    let lastFoundPointNumber = 0;
  
    // Find the number of the last point successfully captured in the path
    for (let i = path.length - 1; i >= 0; i--) {
      const pointOnPath = path[i];
      const pointData = initialPoints.find(p => p.pos[0] === pointOnPath[0] && p.pos[1] === pointOnPath[1]);
      if (pointData) {
        lastFoundPointNumber = pointData.point;
        break;
      }
    }
  
    if (lastFoundPointNumber === initialPoints.length) {
      return lastFoundPointNumber + 1; // Puzzle solved
    }
  
    return lastFoundPointNumber + 1;
  }, [path]);

  const handleDragStart = (row: number, col: number) => {
    if (solved) return;
    const lastPos = path[path.length - 1];
    // Can only start dragging from the last point in the path
    if (lastPos[0] === row && lastPos[1] === col) {
      setIsDragging(true);
      setError(null);
    }
  };

  const handleDragEnd = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };
  
  const handleDragEnter = (row: number, col: number) => {
    if (!isDragging || solved) return;
    
    const lastPos = path[path.length - 1];

    // Check if it's a valid next move (adjacent)
    const dx = Math.abs(row - lastPos[0]);
    const dy = Math.abs(col - lastPos[1]);
    if (dx + dy !== 1) {
      // Not an adjacent cell, ignore
      return;
    }
    
    // Check for walls
    if (checkWall(lastPos, [row, col])) {
        setError("You cannot cross a wall.");
        setIsDragging(false);
        return;
    }

    // Check if moving back on the path
    if (path.length > 1 && path[path.length - 2][0] === row && path[path.length - 2][1] === col) {
      const newPath = path.slice(0, -1);
      setPath(newPath);
      return;
    }

    // Check if cell is already in path
    if (path.some(p => p[0] === row && p[1] === col)) {
        setError("You cannot cross your own path.");
        setIsDragging(false);
        return;
    }

    const newPath = [...path, [row, col] as [number, number]];
    setPath(newPath);

    const targetPoint = initialPoints.find(p => p.point === nextPointToFind);
    const clickedPoint = initialPoints.find(p => p.pos[0] === row && p.pos[1] === col);

    if (clickedPoint && (!targetPoint || clickedPoint.point !== targetPoint.point)) {
        setError("Wrong order! Follow the numbers.");
        setIsDragging(false);
        setTimeout(() => setPath(path), 300); // revert path
        return;
    }
    
    // Check for win condition
    if (nextPointToFind > initialPoints.length) {
      setSolved(true);
      setTimeout(onSolve, 500);
    }
  };
  
  const resetPuzzle = () => {
    setPath([initialPoints[0].pos]);
    setSolved(false);
    setError(null);
    setIsDragging(false);
  }

  const grid = Array(GRID_SIZE).fill(null).map((_, r) => Array(GRID_SIZE).fill(null).map((__, c) => {
    const point = initialPoints.find(p => p.pos[0] === r && p.pos[1] === c);
    const isInPath = path.some(p => p[0] === r && p[1] === c);
    const isLastInPath = isInPath && path[path.length - 1][0] === r && path[path.length - 1][1] === c;
    
    return { r, c, point, isInPath, isLastInPath };
  }));

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        className="grid grid-cols-7 gap-0.5 bg-neutral-700 p-2 rounded-lg aspect-square w-full max-w-sm select-none"
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        {grid.flat().map(({ r, c, point, isInPath, isLastInPath }) => (
          <div
            key={`${r}-${c}`}
            className={cn(
              'relative aspect-square flex items-center justify-center rounded-sm transition-colors duration-200',
              'bg-neutral-800/50',
              { 'hover:bg-neutral-700/80': !isDragging },
              { 'bg-primary/20': isInPath },
              { 'cursor-pointer': !solved && isLastInPath },
              { 'cursor-grab': isLastInPath && !isDragging },
              { 'cursor-grabbing': isDragging }
            )}
            onMouseDown={() => handleDragStart(r, c)}
            onMouseEnter={() => handleDragEnter(r, c)}
          >
            {point && (
              <div className={cn(
                "absolute z-10 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold pointer-events-none",
                 path.some(p => p[0] === r && p[1] === c)
                   ? 'bg-primary text-primary-foreground ring-2 ring-offset-2 ring-offset-neutral-800 ring-primary'
                   : 'bg-neutral-900 text-white'
              )}>
                {point.point}
              </div>
            )}
            {/* Path lines */}
            {isInPath && path.findIndex(p => p[0] === r && p[1] === c) < path.length -1 && (
                <div className={cn("absolute bg-primary pointer-events-none", {
                    'h-full w-1': path[path.findIndex(p => p[0] === r && p[1] === c) + 1][0] !== r, // vertical
                    'w-full h-1': path[path.findIndex(p => p[0] === r && p[1] === c) + 1][1] !== c, // horizontal
                    'top-1/2': path[path.findIndex(p => p[0] === r && p[1] === c) + 1][0] < r,
                    'bottom-1/2': path[path.findIndex(p => p[0] === r && p[1] === c) + 1][0] > r,
                    'left-1/2': path[path.findIndex(p => p[0] === r && p[1] === c) + 1][1] < c,
                    'right-1/2': path[path.findIndex(p => p[0] === r && p[1] === c) + 1][1] > c,
                })} />
            )}
             {/* Path line from previous cell to this one */}
             {isInPath && path.findIndex(p => p[0] === r && p[1] === c) > 0 && (
                <div className={cn("absolute bg-primary pointer-events-none", {
                    'h-1/2 w-1 top-0': path[path.findIndex(p => p[0] === r && p[1] === c) - 1][0] > r, // From bottom
                    'h-1/2 w-1 bottom-0': path[path.findIndex(p => p[0] === r && p[1] === c) - 1][0] < r, // From top
                    'w-1/2 h-1 left-0': path[path.findIndex(p => p[0] === r && p[1] === c) - 1][1] > c, // From right
                    'w-1/2 h-1 right-0': path[path.findIndex(p => p[0] === r && p[1] === c) - 1][1] < c, // From left
                })} />
            )}

            {/* Wall rendering */}
            {walls.map((wall, i) => {
                // Horizontal wall
                if(wall.from[0] === r && wall.from[1] === c && wall.to[0] === r && wall.to[1] === c+1) {
                    return <div key={`wall-h-${i}`} className="absolute right-0 top-0 bottom-0 w-0.5 bg-neutral-900 z-20 pointer-events-none"></div>
                }
                 if(wall.from[0] === r && wall.from[1] === c+1 && wall.to[0] === r && wall.to[1] === c) {
                    return <div key={`wall-h-${i}`} className="absolute left-0 top-0 bottom-0 w-0.5 bg-neutral-900 z-20 pointer-events-none"></div>
                }
                // Vertical wall
                if(wall.from[0] === r && wall.from[1] === c && wall.to[0] === r+1 && wall.to[1] === c) {
                     return <div key={`wall-v-${i}`} className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 z-20 pointer-events-none"></div>
                }
                 if(wall.from[0] === r+1 && wall.from[1] === c && wall.to[0] === r && wall.to[1] === c) {
                     return <div key={`wall-v-${i}`} className="absolute top-0 left-0 right-0 h-0.5 bg-neutral-900 z-20 pointer-events-none"></div>
                }
                return null;
            })}

            {isLastInPath && !solved && (
                 <div className="absolute w-2 h-2 rounded-full bg-primary animate-ping pointer-events-none"></div>
            )}
          </div>
        ))}
      </div>
       {error && <p className="text-red-400 text-sm animate-shake">{error}</p>}
       {solved && <p className="text-green-400 text-sm font-bold">Solved!</p>}

       <Button onClick={resetPuzzle} variant="secondary" size="sm">Reset Puzzle</Button>
    </div>
  );
}
