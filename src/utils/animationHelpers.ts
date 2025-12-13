/**
 * Animation helper utilities for generating randomized properties
 */

export interface HeartProperties {
  id: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  rotation: number;
}

/**
 * Generates random properties for a single heart
 */
export const generateHeartProperties = (id: number): HeartProperties => {
  // Random size between 16px and 48px
  const size = Math.floor(Math.random() * 32) + 16;
  
  // Random opacity between 0.3 and 0.9
  const opacity = Math.random() * 0.6 + 0.3;
  
  // Random duration between 8s and 20s
  const duration = Math.random() * 12 + 8;
  
  // Random delay to stagger animations
  const delay = Math.random() * 5;
  
  // Random starting X position across the screen
  const startX = Math.random() * 100;
  
  // Start from bottom of screen
  const startY = 100;
  
  // Random ending X position with drift (-20% to +20% from start)
  const drift = (Math.random() - 0.5) * 40;
  const endX = Math.max(0, Math.min(100, startX + drift));
  
  // End at top of screen with some variation
  const endY = -20 + Math.random() * 10;
  
  // Random rotation for variety
  const rotation = Math.random() * 360;
  
  return {
    id,
    size,
    opacity,
    duration,
    delay,
    startX,
    startY,
    endX,
    endY,
    rotation,
  };
};

/**
 * Generates an array of heart properties
 */
export const generateHeartsArray = (count: number): HeartProperties[] => {
  return Array.from({ length: count }, (_, i) => generateHeartProperties(i));
};

/**
 * Calculates animation keyframes for a heart
 */
export const getHeartKeyframes = (heart: HeartProperties): string => {
  return `
    @keyframes float-heart-${heart.id} {
      0% {
        transform: translate(${heart.startX}vw, ${heart.startY}vh) rotate(${heart.rotation}deg) scale(0);
        opacity: 0;
      }
      10% {
        opacity: ${heart.opacity};
        transform: translate(${heart.startX}vw, ${heart.startY - 10}vh) rotate(${heart.rotation}deg) scale(1);
      }
      90% {
        opacity: ${heart.opacity};
        transform: translate(${heart.endX}vw, ${heart.endY + 10}vh) rotate(${heart.rotation + 180}deg) scale(1);
      }
      100% {
        transform: translate(${heart.endX}vw, ${heart.endY}vh) rotate(${heart.rotation + 180}deg) scale(0);
        opacity: 0;
      }
    }
  `;
};

/**
 * Generates CSS animation string for a heart
 */
export const getHeartAnimationStyle = (heart: HeartProperties): string => {
  return `float-heart-${heart.id} ${heart.duration}s ease-in-out ${heart.delay}s infinite`;
};