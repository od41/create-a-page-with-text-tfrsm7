import { useState, useCallback } from 'react';

interface ClickHeart {
  id: string;
  x: number;
  y: number;
  size: number;
  timestamp: number;
}

const InteractiveElements = () => {
  const [clickHearts, setClickHearts] = useState<ClickHeart[]>([]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Get click position
    const x = e.clientX;
    const y = e.clientY;
    
    // Random size between 40px and 60px (larger than floating hearts)
    const size = Math.floor(Math.random() * 20) + 40;
    
    // Create new heart
    const newHeart: ClickHeart = {
      id: `click-heart-${Date.now()}-${Math.random()}`,
      x,
      y,
      size,
      timestamp: Date.now(),
    };
    
    setClickHearts((prev) => [...prev, newHeart]);
    
    // Remove heart after animation completes (3 seconds)
    setTimeout(() => {
      setClickHearts((prev) => prev.filter((heart) => heart.id !== newHeart.id));
    }, 3000);
  }, []);

  return (
    <>
      {/* Full-screen click capture overlay */}
      <div
        className="fixed inset-0 z-30 cursor-pointer"
        onClick={handleClick}
        style={{
          pointerEvents: 'auto',
        }}
      />

      {/* Click-generated hearts container */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
        {clickHearts.map((heart) => {
          // Calculate animation duration (2-3 seconds, faster than floating)
          const duration = 2 + Math.random();
          
          return (
            <div
              key={heart.id}
              className="absolute"
              style={{
                left: `${heart.x}px`,
                top: `${heart.y}px`,
                width: `${heart.size}px`,
                height: `${heart.size}px`,
                transform: 'translate(-50%, -50%)',
                animation: `click-heart-float ${duration}s ease-out forwards`,
                willChange: 'transform, opacity',
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  fill="#e11d48"
                  className="drop-shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(225, 29, 72, 0.6))',
                  }}
                />
              </svg>
            </div>
          );
        })}
      </div>

      {/* Keyframe animation for click hearts */}
      <style>{`
        @keyframes click-heart-float {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            transform: translate(-50%, -50%) scale(1.2) rotate(5deg);
            opacity: 1;
          }
          15% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -200px) scale(0.5) rotate(10deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default InteractiveElements;