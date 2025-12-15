import { useState, useEffect } from 'react';

export interface AnimationPhase {
  name: string;
  delay: number;
  duration: number;
}

export interface AnimationSequenceConfig {
  phases: AnimationPhase[];
  onComplete?: () => void;
}

export const useAnimationSequence = (config: AnimationSequenceConfig) => {
  const [currentPhase, setCurrentPhase] = useState<number>(-1);
  const [isComplete, setIsComplete] = useState(false);
  const [activePhases, setActivePhases] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    config.phases.forEach((phase, index) => {
      // Timer to activate phase
      const activateTimer = setTimeout(() => {
        setCurrentPhase(index);
        setActivePhases(prev => new Set(prev).add(phase.name));
      }, phase.delay);

      timers.push(activateTimer);
    });

    // Timer to mark sequence as complete
    const lastPhase = config.phases[config.phases.length - 1];
    if (lastPhase) {
      const completeTimer = setTimeout(() => {
        setIsComplete(true);
        config.onComplete?.();
      }, lastPhase.delay + lastPhase.duration);

      timers.push(completeTimer);
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [config]);

  const isPhaseActive = (phaseName: string): boolean => {
    return activePhases.has(phaseName);
  };

  const getPhaseProgress = (phaseName: string): number => {
    const phaseIndex = config.phases.findIndex(p => p.name === phaseName);
    if (phaseIndex === -1 || phaseIndex > currentPhase) return 0;
    if (phaseIndex < currentPhase) return 1;
    return 0.5; // Currently active
  };

  return {
    currentPhase,
    isComplete,
    activePhases,
    isPhaseActive,
    getPhaseProgress,
  };
};
