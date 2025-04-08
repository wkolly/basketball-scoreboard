import React from 'react';
import { useScoreboard } from '../../contexts/ScoreboardContext';
import TeamDisplay from './TeamDisplay';
import ClockDisplay from './ClockDisplay';
import PeriodDisplay from './PeriodDisplay';
import NewsTicker from './NewsTicker';

// Simple helper function for formatting the clock
const formatClockTime = (clock: { minutes: number, seconds: number, tenths: number }): string => {
  const { minutes, seconds, tenths } = clock;
  // If we're in the last minute, show tenths of seconds
  if (minutes === 0) {
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${tenths}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const ScoreboardDisplay: React.FC = () => {
  const { state } = useScoreboard();
  const { homeTeam, awayTeam, period, clock } = state;
  
  // Get the formatted clock display without using the useGameClock hook
  const displayTime = formatClockTime(clock);
  
  return (
    <div className="scoreboard-container">
      <div className="grid grid-cols-3 gap-4">
        {/* Home Team Display */}
        <TeamDisplay 
          team={homeTeam} 
          isHome={true} 
        />
        
        {/* Center Section: Clock and Period */}
        <div className="flex flex-col items-center justify-center">
          <ClockDisplay time={displayTime} />
          <PeriodDisplay period={period.current} total={period.total} />
        </div>
        
        {/* Away Team Display */}
        <TeamDisplay 
          team={awayTeam} 
          isHome={false} 
        />
      </div>
      
      {/* Bottom section: Possession indicator and news ticker */}
      <div className="mt-4">
        <div className="flex justify-center space-x-4 mb-2">
          <div className={`possession-indicator ${homeTeam.hasPossession ? 'possession-active' : ''}`}></div>
          <div>POSSESSION</div>
          <div className={`possession-indicator ${awayTeam.hasPossession ? 'possession-active' : ''}`}></div>
        </div>
        <NewsTicker />
      </div>
    </div>
  );
};

export default ScoreboardDisplay;