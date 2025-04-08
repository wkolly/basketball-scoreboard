import React, { useEffect } from 'react';
import ScoreboardDisplay from '../components/scoreboard/ScoreboardDisplay';
import ControlPanel from '../components/control-panel/ControlPanel';

const ScoreboardPage: React.FC = () => {
  // Set page title
  useEffect(() => {
    document.title = 'Basketball Scoreboard - Dashboard';
  }, []);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ 
        fontSize: "32px", 
        fontWeight: "bold", 
        marginBottom: "24px", 
        textAlign: "center",
        color: "#333"
      }}>
        Scoreboard Dashboard
      </h1>
      
      <div style={{ marginBottom: "40px" }}>
        <ScoreboardDisplay />
      </div>
      
      <div>
        <ControlPanel />
      </div>
    </div>
  );
};

export default ScoreboardPage;