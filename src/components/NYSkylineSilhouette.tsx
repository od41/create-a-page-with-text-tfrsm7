import { useEffect, useState } from 'react';
import type { Building, TwinkleLight } from '../types/animation';

const NYSkylineSilhouette = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    // Generate NYC-inspired buildings with varying heights
    const buildingData: Building[] = [
      { id: 'b1', x: 0, width: 60, height: 180, windows: [] },
      { id: 'b2', x: 65, width: 50, height: 250, windows: [] }, // Empire State-ish
      { id: 'b3', x: 120, width: 45, height: 160, windows: [] },
      { id: 'b4', x: 170, width: 55, height: 220, windows: [] },
      { id: 'b5', x: 230, width: 40, height: 140, windows: [] },
      { id: 'b6', x: 275, width: 70, height: 280, windows: [] }, // One World Trade-ish
      { id: 'b7', x: 350, width: 45, height: 190, windows: [] },
      { id: 'b8', x: 400, width: 50, height: 200, windows: [] },
      { id: 'b9', x: 455, width: 55, height: 170, windows: [] },
      { id: 'b10', x: 515, width: 48, height: 240, windows: [] },
      { id: 'b11', x: 568, width: 42, height: 150, windows: [] },
      { id: 'b12', x: 615, width: 60, height: 210, windows: [] },
    ];

    // Generate twinkling windows for each building
    const buildingsWithWindows = buildingData.map(building => {
      const windows: TwinkleLight[] = [];
      const windowsPerRow = Math.floor(building.width / 8);
      const rows = Math.floor(building.height / 12);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < windowsPerRow; col++) {
          // Not all windows are lit
          if (Math.random() > 0.3) {
            windows.push({
              id: `${building.id}-w${row}-${col}`,
              x: building.x + col * 8 + 4,
              y: 300 - building.height + row * 12 + 4,
              delay: Math.random() * 4,
              duration: 2 + Math.random() * 3,
            });
          }
        }
      }

      return { ...building, windows };
    });

    setBuildings(buildingsWithWindows);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96"
        viewBox="0 0 700 300"
        preserveAspectRatio="xMidYMax meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Building silhouettes */}
        {buildings.map(building => (
          <rect
            key={building.id}
            x={building.x}
            y={300 - building.height}
            width={building.width}
            height={building.height}
            fill="rgba(0, 0, 0, 0.6)"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="0.5"
          />
        ))}

        {/* Twinkling windows */}
        {buildings.map(building =>
          building.windows.map(window => (
            <rect
              key={window.id}
              x={window.x}
              y={window.y}
              width="3"
              height="4"
              fill="#FFE57F"
              opacity="0.8"
              className="animate-twinkle"
              style={{
                animationDelay: `${window.delay}s`,
                animationDuration: `${window.duration}s`,
              }}
            />
          ))
        )}

        {/* Special landmarks - antenna on tallest building */}
        <line
          x1="310"
          y1="20"
          x2="310"
          y2="5"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1"
        />
        <circle
          cx="310"
          cy="5"
          r="2"
          fill="#FF6B6B"
          className="animate-pulse"
        />
      </svg>
    </div>
  );
};

export default NYSkylineSilhouette;
