import type { ReactNode } from 'react';
import NYSkylineSilhouette from './NYSkylineSilhouette';

interface AnimatedBackgroundProps {
  children: ReactNode;
}

const AnimatedBackground = ({ children }: AnimatedBackgroundProps) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-b opacity-90"
        style={{
          background: 'linear-gradient(180deg, #1a0b2e 0%, #2d1b4e 25%, #4a2c6d 50%, #6b3d8c 75%, #8b5fa8 100%)',
          animation: 'gradient-shift 20s ease infinite',
        }}
      />

      {/* Secondary animated gradient layer for depth */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(219, 112, 147, 0.3) 0%, transparent 60%)',
          animation: 'pulse-glow 8s ease-in-out infinite',
        }}
      />

      {/* Stars/sparkles effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: 0.3 + Math.random() * 0.7,
            }}
          />
        ))}
      </div>

      {/* NYC Skyline */}
      <NYSkylineSilhouette />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Inline keyframe animations */}
      <style>{`
        @keyframes gradient-shift {
          0% {
            filter: hue-rotate(0deg) brightness(1);
          }
          25% {
            filter: hue-rotate(-10deg) brightness(1.1);
          }
          50% {
            filter: hue-rotate(-20deg) brightness(1.2);
          }
          75% {
            filter: hue-rotate(-10deg) brightness(1.1);
          }
          100% {
            filter: hue-rotate(0deg) brightness(1);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
