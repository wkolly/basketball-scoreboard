// Example of updated TeamDisplay.tsx
import React from 'react';
import { Team } from '../../types';

interface TeamDisplayProps {
  team: Team;
  isHome: boolean;
}

const TeamDisplay: React.FC<TeamDisplayProps> = ({ team, isHome }) => {
  return (
    <div className="team-display">
      <div className="team-name">
        {team.name}
      </div>
      
      {/* Score Display */}
      <div className="team-score">
        {team.score}
      </div>
      
      {/* Team Stats */}
      <div className="flex justify-between">
        <div className="stat-box" style={{width: '48%'}}>
          <div className="stat-label">FOULS</div>
          <div className="stat-value">
            {team.fouls}
          </div>
        </div>
        <div className="stat-box" style={{width: '48%'}}>
          <div className="stat-label">TIMEOUTS</div>
          <div className="stat-value">
            {team.timeouts}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDisplay;