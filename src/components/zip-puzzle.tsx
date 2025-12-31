'use client';

import { useState, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const GRID_SIZE = 7;
// Use a smaller cell size for mobile, and larger for desktop
const getCellSize = () => window.innerWidth < 640 ? 36 : 48;


interface PuzzleConfig {
    points: { point: number; pos: [number, number] }[];
    walls: { from: [number, number], to: [number, number] }[];
}

export const puzzles: PuzzleConfig[] = [
    {
        points: [
            { point: 1, pos: [0, 2] }, { point: 2, pos: [3, 0] }, { point: 3, pos: [5, 4] },
            { point: 4, pos: [6, 4] }, { point: 5, pos: [5, 5] }, { point: 6, pos: [4, 5] },
            { point: 7, pos: [4, 6] }, { point: 8, pos: [1, 2] }, { point: 9, pos: [1, 1] },
            { point: 10, pos: [2, 1] }, { point: 11, pos: [2, 4] }
        ],
        walls: [
             // Top-right L-shape
            { from: [1, 2], to: [2, 2] }, { from: [2, 2], to: [2, 3] }, { from: [1, 4], to: [2, 4] },
            // Bottom-left L-shape
            { from: [5, 0], to: [5, 1] }, { from: [5, 1], to: [6, 1] }, { from: [5, 3], to: [5, 4] }
        ],
    },
];

const checkWall = (from: [number, number], to: [number, number], walls: PuzzleConfig['walls']) => {
  return walls.some(wall => 
    (wall.from[0] === from[0] && wall.from[1] === from[1] && wall.to[0] === to[0] && wall.to[1] === to[1]) ||
    (wall.from[0] === to[0] && wall.from[1] === to[1] && wall.to[0] === from[0] && wall.to[1] === from[1])
  );
}

const generatePathData = (path: [number, number][], cellSize: number) => {
  if (path.length < 2) return '';
  const halfCell = cellSize / 2;
  
  let d = `M ${path[0][1] * cellSize + halfCell} ${path[0][0] * cellSize + halfCell}`;
  
  for (let i = 1; i < path.length; i++) {
    d += ` L ${path[i][1] * cellSize + halfCell} ${path[i][0] * cellSize + halfCell}`;
  }
  return d;
};


interface ZipPuzzleProps {
    puzzleConfig: PuzzleConfig;
    onSolve: () => void;
}

export default function ZipPuzzle({ puzzleConfig, onSolve }: ZipPuzzleProps) {
  const [path, setPath] = useState<[number, number][]>([puzzleConfig.points[0].pos]);
  const [solved, setSolved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cellSize, setCellSize] = useState(getCellSize());

  useEffect(() => {
    const handleResize = () => setCellSize(getCellSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset state if puzzle changes
  useEffect(() => {
    setPath([puzzleConfig.points[0].pos]);
    setSolved(false);
    setError(null);
    setIsDragging(false);
  }, [puzzleConfig]);
  
  const { points: initialPoints, walls } = puzzleConfig;
  
  const sortedPoints = useMemo(() => [...initialPoints].sort((a, b) => a.point - b.point), [initialPoints]);

  const nextPointToFind = useMemo(() => {
    const pointsOnPath = path
        .map(pos => sortedPoints.find(p => p.pos[0] === pos[0] && p.pos[1] === pos[1]))
        .filter((p): p is { point: number; pos: [number, number]; } => p !== undefined);

    if (pointsOnPath.length === 0) return 1;

    for (let i = 0; i < pointsOnPath.length; i++) {
      if (pointsOnPath[i].point !== i + 1) {
        setError("Wrong order! Follow the numbers.");
        setIsDragging(false);
        return i + 1;
      }
    }
    
    return pointsOnPath.length + 1;
  }, [path, sortedPoints]);

  const handleDragStart = (row: number, col: number) => {
    if (solved) return;
    const lastPos = path[path.length - 1];
    if (lastPos[0] === row && lastPos[1] === col) {
      setIsDragging(true);
      setError(null);
    }
  };

  const handleDragEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      const pointsOnPath = path
        .map(pos => sortedPoints.find(p => p.pos[0] === pos[0] && p.pos[1] === pos[1]))
        .filter((p): p is { point: number; pos: [number, number] } => p !== undefined);
      
      const allPointsFoundInOrder = pointsOnPath.length === sortedPoints.length && pointsOnPath.every((p, i) => p.point === i + 1);
      
      if (allPointsFoundInOrder) {
        setSolved(true);
        setTimeout(onSolve, 500);
      }
    }
  };
  
  const handleInteraction = (row: number, col: number) => {
    if (!isDragging || solved) return;
    
    const lastPos = path[path.length - 1];
    
    const dx = Math.abs(row - lastPos[0]);
    const dy = Math.abs(col - lastPos[1]);
    if (dx + dy !== 1) {
      return;
    }
    
    if (checkWall(lastPos, [row, col], walls)) {
        setError("You cannot cross a wall.");
        setIsDragging(false);
        return;
    }

    if (path.length > 1 && path[path.length - 2][0] === row && path[path.length - 2][1] === col) {
      const pointBeingRemoved = initialPoints.find(p => p.pos[0] === lastPos[0] && p.pos[1] === lastPos[1]);
      if (!pointBeingRemoved || pointBeingRemoved.point >= nextPointToFind) {
          const newPath = path.slice(0, -1);
          setPath(newPath);
      }
      return;
    }

    if (path.some(p => p[0] === row && p[1] === col)) {
        setError("You cannot cross your own path.");
        setIsDragging(false);
        return;
    }

    const clickedPoint = initialPoints.find(p => p.pos[0] === row && p.pos[1] === col);
    if (clickedPoint && clickedPoint.point !== nextPointToFind) {
        setError("Wrong order! Follow the numbers.");
        setIsDragging(false);
        setPath([...path, [row, col]]);
        setTimeout(() => setPath(path), 300); 
        return;
    }

    const newPath = [...path, [row, col] as [number, number]];
    setPath(newPath);
  };
  
  const resetPuzzle = () => {
    setPath([sortedPoints[0].pos]);
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
  
  const svgPathData = useMemo(() => generatePathData(path, cellSize), [path, cellSize]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        className="relative grid bg-neutral-700 p-1 sm:p-2 rounded-lg aspect-square w-full max-w-sm select-none"
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchEnd={handleDragEnd}
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
      >
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
          viewBox={`0 0 ${GRID_SIZE * cellSize} ${GRID_SIZE * cellSize}`}
        >
          <path
            d={svgPathData}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-100"
          />
        </svg>

        {grid.flat().map(({ r, c, point, isInPath, isLastInPath }) => (
          <div
            key={`${r}-${c}`}
            className={cn(
              'relative aspect-square flex items-center justify-center rounded-sm transition-colors duration-200',
              'bg-neutral-800/50',
              { 'hover:bg-neutral-700/80': !isDragging },
              { 'cursor-pointer': !solved && isLastInPath },
              { 'cursor-grab': isLastInPath && !isDragging },
              { 'cursor-grabbing': isDragging }
            )}
            onMouseDown={() => handleDragStart(r, c)}
            onMouseEnter={() => handleInteraction(r, c)}
            onTouchStart={(e) => {
              const touch = e.touches[0];
              handleDragStart(r, c);
            }}
            onTouchMove={(e) => {
              const touch = e.touches[0];
              const element = document.elementFromPoint(touch.clientX, touch.clientY);
              if (element) {
                const rect = element.getBoundingClientRect();
                const gridX = Math.floor((touch.clientX - rect.left) / cellSize);
                const gridY = Math.floor((touch.clientY - rect.top) / cellSize);
                // The above calculation is tricky. A simpler way is to check the element's data attributes if we add them.
                // For now, this is a placeholder for a more robust touch solution.
              }
            }}
            style={{ height: `${cellSize}px`, width: `${cellSize}px` }}
          >
            {point && (
              <div className={cn(
                "absolute z-20 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold pointer-events-none transition-all",
                 isInPath
                   ? 'bg-primary text-primary-foreground ring-2 ring-offset-2 ring-offset-neutral-800 ring-primary'
                   : 'bg-neutral-900 text-white'
              )}>
                {point.point}
              </div>
            )}
           
            {walls.map((wall, i) => {
                if(wall.from[0] === r && wall.from[1] === c && wall.to[0] === r && wall.to[1] === c+1) {
                    return <div key={`wall-h-${i}`} className="absolute right-0 top-0 bottom-0 w-0.5 bg-neutral-900 z-20 pointer-events-none"></div>
                }
                 if(wall.from[0] === r && wall.from[1] === c+1 && wall.to[0] === r && wall.to[1] === c) {
                    return <div key={`wall-h-${i}`} className="absolute left-0 top-0 bottom-0 w-0.5 bg-neutral-900 z-20 pointer-events-none"></div>
                }
                if(wall.from[0] === r && wall.from[1] === c && wall.to[0] === r+1 && wall.to[1] === c) {
                     return <div key={`wall-v-${i}`} className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 z-20 pointer-events-none"></div>
                }
                 if(wall.from[0] === r+1 && wall.from[1] === c && wall.to[0] === r && wall.to[1] === c) {
                     return <div key={`wall-v-${i}`} className="absolute top-0 left-0 right-0 h-0.5 bg-neutral-900 z-20 pointer-events-none"></div>
                }
                return null;
            })}

            {isLastInPath && !solved && (
                 <div className="absolute w-2 h-2 rounded-full bg-primary animate-ping pointer-events-none z-20"></div>
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
