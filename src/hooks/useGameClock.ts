import { useCallback, useEffect } from 'react';
import { useScoreboard } from '../contexts/ScoreboardContext';

export const useGameClock = () => {
  const { state, dispatch } = useScoreboard();
  const { clock } = state;
  
  const startClock = useCallback(() => {
    dispatch({ type: 'START_CLOCK' });
  }, [dispatch]);

  const stopClock = useCallback(() => {
    dispatch({ type: 'STOP_CLOCK' });
  }, [dispatch]);

  const resetClock = useCallback((minutes: number, seconds: number) => {
    dispatch({ type: 'RESET_CLOCK', minutes, seconds });
  }, [dispatch]);

  const toggleClock = useCallback(() => {
    if (clock.isRunning) {
      stopClock();
    } else {
      startClock();
    }
  }, [clock.isRunning, startClock, stopClock]);

  const formatClockDisplay = useCallback((): string => {
    const { minutes, seconds, tenths } = clock;
    // If we're in the last minute, show tenths of seconds
    if (minutes === 0) {
      return `${minutes}:${seconds.toString().padStart(2, '0')}.${tenths}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [clock]);

  // Add console logs to help debug the double interval issue
  useEffect(() => {
    let intervalId: number | null = null;
    
    if (clock.isRunning) {
      console.log('Setting up clock interval in useGameClock');
      const intervalTime = clock.minutes === 0 ? 100 : 1000;
      
      intervalId = window.setInterval(() => {
        console.log('Tick from useGameClock hook!');
        dispatch({ type: 'TICK_CLOCK', source: 'useGameClock' });
      }, intervalTime);
    }
    
    // Clean up interval on unmount or when clock stops
    return () => {
      if (intervalId !== null) {
        console.log('Clearing clock interval in useGameClock');
        window.clearInterval(intervalId);
      }
    };
  }, [clock.isRunning, dispatch, clock.minutes]);

  return {
    clock,
    startClock,
    stopClock,
    resetClock,
    toggleClock,
    formatClockDisplay,
  };
};