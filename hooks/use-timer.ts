import { useEffect, useState, useCallback } from 'react';

interface UseTimerOptions {
  workDuration?: number; // in seconds
  restDuration?: number; // in seconds
  onComplete?: () => void;
  onModeChange?: (mode: 'work' | 'rest') => void;
}

export function useTimer({
  workDuration = 25 * 60, // 25 minutes default
  restDuration = 5 * 60, // 5 minutes default
  onComplete,
  onModeChange,
}: UseTimerOptions) {
  const [timeRemaining, setTimeRemaining] = useState(workDuration);
  const [mode, setMode] = useState<'work' | 'rest'>('work');
  const [isRunning, setIsRunning] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  const totalDuration = mode === 'work' ? workDuration : restDuration;

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Mode complete
          const newMode = mode === 'work' ? 'rest' : 'work';
          setMode(newMode);
          onModeChange?.(newMode);

          if (newMode === 'work') {
            setCycleCount((c) => c + 1);
          }

          onComplete?.();
          return newMode === 'work' ? workDuration : restDuration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode, workDuration, restDuration, onComplete, onModeChange]);

  const toggle = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeRemaining(workDuration);
    setMode('work');
    setCycleCount(0);
  }, [workDuration]);

  const skip = useCallback(() => {
    const newMode = mode === 'work' ? 'rest' : 'work';
    setMode(newMode);
    setTimeRemaining(newMode === 'work' ? workDuration : restDuration);
    onModeChange?.(newMode);
  }, [mode, workDuration, restDuration, onModeChange]);

  return {
    timeRemaining,
    totalDuration,
    mode,
    isRunning,
    cycleCount,
    toggle,
    reset,
    skip,
  };
}
