import React from 'react';
import { useScoreboard } from '../../contexts/ScoreboardContext';
import TeamControl from './TeamControl';
import ClockControl from './ClockControl';
import PeriodControl from './PeriodControl';
import GameReset from './GameReset';

const ControlPanel: React.FC = () => {
  const { state } = useScoreboard();
  const { homeTeam, awayTeam } = state;
  
  return (
    <div className="control-panel">
      <h2 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}>Control Panel</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Left column */}
        <div>
          <TeamControl team={homeTeam} isHome={true} />
          <div style={{ marginTop: "20px" }}>
            <TeamControl team={awayTeam} isHome={false} />
          </div>
        </div>
        
        {/* Right column */}
        <div>
          <ClockControl />
          <div style={{ marginTop: "20px" }}>
            <PeriodControl />
          </div>
          <div style={{ marginTop: "20px" }}>
            <GameReset />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;