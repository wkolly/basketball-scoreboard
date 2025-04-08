import React, { useState } from 'react';
import { Team } from '../../types';
import { useScoreboard } from '../../contexts/ScoreboardContext';

interface TeamControlProps {
  team: Team;
  isHome: boolean;
}

const TeamControl: React.FC<TeamControlProps> = ({ team, isHome }) => {
  const { dispatch } = useScoreboard();
  const [teamName, setTeamName] = useState(team.name);
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  };
  
  const handleNameSubmit = () => {
    dispatch({ 
      type: 'UPDATE_TEAM_NAME', 
      teamId: team.id, 
      name: teamName 
    });
  };
  
  const handleScoreChange = (points: number) => {
    dispatch({
      type: 'UPDATE_SCORE',
      teamId: team.id,
      points
    });
  };
  
  const handleFoulChange = (value: number) => {
    dispatch({
      type: 'UPDATE_FOULS',
      teamId: team.id,
      value
    });
  };
  
  const handleTimeoutChange = (value: number) => {
    dispatch({
      type: 'UPDATE_TIMEOUTS',
      teamId: team.id,
      value
    });
  };
  
  const handlePossessionChange = () => {
    dispatch({
      type: 'TOGGLE_POSSESSION',
      teamId: team.id
    });
  };

  const buttonStyle = {
    padding: "8px 16px",
    margin: "0 5px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold" as const
  };
  
  return (
    <div className="control-section">
      <h3 className="control-title">{isHome ? 'Home' : 'Away'} Team Controls</h3>
      
      {/* Team Name */}
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Team Name</label>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            value={teamName}
            onChange={handleNameChange}
            style={{ 
              flex: "1", 
              padding: "8px", 
              borderRadius: "4px 0 0 4px", 
              border: "1px solid #ddd"
            }}
          />
          <button
            type="button"
            onClick={handleNameSubmit}
            style={{ 
              padding: "8px 16px", 
              backgroundColor: "#3498db", 
              color: "white", 
              borderRadius: "0 4px 4px 0", 
              border: "none",
              cursor: "pointer"
            }}
          >
            Update
          </button>
        </div>
      </div>
      
      {/* Score Controls */}
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Score: {team.score}</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          <button
            onClick={() => handleScoreChange(1)}
            style={{ ...buttonStyle, backgroundColor: "#2ecc71", color: "white" }}
          >
            +1
          </button>
          <button
            onClick={() => handleScoreChange(2)}
            style={{ ...buttonStyle, backgroundColor: "#2ecc71", color: "white" }}
          >
            +2
          </button>
          <button
            onClick={() => handleScoreChange(3)}
            style={{ ...buttonStyle, backgroundColor: "#2ecc71", color: "white" }}
          >
            +3
          </button>
          <button
            onClick={() => handleScoreChange(-1)}
            style={{ ...buttonStyle, backgroundColor: "#e74c3c", color: "white" }}
          >
            -1
          </button>
        </div>
      </div>
      
      {/* Foul Controls */}
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Team Fouls: {team.fouls}</label>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => handleFoulChange(1)}
            style={{ ...buttonStyle, backgroundColor: "#f39c12", color: "white" }}
          >
            +1
          </button>
          <button
            onClick={() => handleFoulChange(-1)}
            style={{ ...buttonStyle, backgroundColor: "#f39c12", color: "white" }}
          >
            -1
          </button>
        </div>
      </div>
      
      {/* Timeout Controls */}
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Timeouts: {team.timeouts}</label>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => handleTimeoutChange(1)}
            style={{ ...buttonStyle, backgroundColor: "#9b59b6", color: "white" }}
          >
            +1
          </button>
          <button
            onClick={() => handleTimeoutChange(-1)}
            style={{ ...buttonStyle, backgroundColor: "#9b59b6", color: "white" }}
          >
            -1
          </button>
        </div>
      </div>
      
      {/* Possession Controls */}
      <div>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Possession</label>
        <button
          onClick={handlePossessionChange}
          style={{ 
            ...buttonStyle, 
            backgroundColor: team.hasPossession ? "#e67e22" : "#95a5a6",
            color: "white",
            padding: "10px 20px",
            width: "100%"
          }}
        >
          {team.hasPossession ? 'Has Possession' : 'Give Possession'}
        </button>
      </div>
    </div>
  );
};

export default TeamControl;