import { useAnimationSequence } from '../hooks/useAnimationSequence';

const LoveNYHero = () => {
  const { isPhaseActive, isComplete } = useAnimationSequence({
    phases: [
      { name: 'fadeIn', delay: 300, duration: 800 },
      { name: 'reveal', delay: 600, duration: 1000 },
      { name: 'scale', delay: 1200, duration: 600 },
    ],
    onComplete: () => {
      console.log('Hero animation sequence complete');
    },
  });

  return (
    <div className="relative flex flex-col items-center justify-center py-12 md:py-20">
      {/* Main Hero Text */}
      <div className="relative text-center">
        {/* 'I Love' in Dancing Script */}
        <div
          className={`
            transition-all duration-800 ease-out
            ${isPhaseActive('fadeIn') ? 'opacity-100' : 'opacity-0'}
            ${isPhaseActive('reveal') ? 'translate-y-0' : 'translate-y-8'}
            ${isPhaseActive('scale') ? 'scale-100' : 'scale-95'}
          `}
          style={{
            fontFamily: "'Dancing Script', cursive",
          }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-pink-200 to-rose-200 drop-shadow-2xl">
            I Love
          </h1>
        </div>

        {/* 'NY' in Bold */}
        <div
          className={`
            transition-all duration-800 ease-out delay-300
            ${isPhaseActive('reveal') ? 'opacity-100' : 'opacity-0'}
            ${isPhaseActive('reveal') ? 'translate-y-0' : 'translate-y-12'}
            ${isPhaseActive('scale') ? 'scale-100' : 'scale-90'}
          `}
          style={{
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black text-white drop-shadow-2xl tracking-tight">
            NY
          </h1>
        </div>

        {/* Decorative heart icon */}
        <div
          className={`
            absolute -top-6 left-1/2 transform -translate-x-1/2
            transition-all duration-600 ease-out delay-500
            ${isPhaseActive('scale') ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
          `}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-pink-400 drop-shadow-lg"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Pulsing glow effect after entrance */}
        {isComplete && (
          <div
            className="absolute inset-0 -z-10 animate-pulse-glow"
            style={
              background: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
            }
          />
        )}
      </div>

      {/* Subtitle with delayed entrance */}
      <div
        className={`
          mt-8 md:mt-12 text-center
          transition-all duration-1000 ease-out delay-700
          ${isComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        <p className="text-xl md:text-2xl lg:text-3xl text-pink-100 font-light tracking-wide drop-shadow-lg">
          Where every moment becomes a memory
        </p>
      </div>

      {/* Inline styles for pulsing animation */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Inter:wght@400;700;900&display=swap');

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoveNYHero;
