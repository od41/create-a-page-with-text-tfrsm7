import { useEffect, useState } from 'react';
import {
  generateHeartsArray,
  getHeartKeyframes,
  getHeartAnimationStyle,
  type HeartProperties,
} from '../utils/animationHelpers';

const HEART_COUNT = 12;

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<HeartProperties[]>([]);

  useEffect(() => {
    // Generate initial hearts on mount
    setHearts(generateHeartsArray(HEART_COUNT));
  }, []);

  return (
    <>
      {/* Container for floating hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute"
            style={{
              width: `${heart.size}px`,
              height: `${heart.size}px`,
              animation: getHeartAnimationStyle(heart),
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
                fill="#ec4899"
                className="drop-shadow-lg"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Inject keyframe animations */}
      <style>{`
        ${hearts.map((heart) => getHeartKeyframes(heart)).join('\n')}
      `}</style>
    </>
  );
};

export default FloatingHearts;