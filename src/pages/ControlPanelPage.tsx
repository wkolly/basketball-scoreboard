import React, { useEffect } from 'react';
import ControlPanel from '../components/control-panel/ControlPanel';

const ControlPanelPage: React.FC = () => {
  // Set page title
  useEffect(() => {
    document.title = 'Basketball Scoreboard - Control Panel';
  }, []);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ 
        fontSize: "32px", 
        fontWeight: "bold", 
        marginBottom: "16px", 
        textAlign: "center",
        color: "#333"
      }}>
        Scoreboard Control Panel
      </h1>
      
      <p style={{ 
        textAlign: "center", 
        color: "#666", 
        maxWidth: "800px", 
        margin: "0 auto", 
        marginBottom: "24px",
        fontSize: "16px",
        lineHeight: "1.5"
      }}>
        Use this control panel to manage the scoreboard. Add points, track fouls, control the clock,
        and update team information.
      </p>
      
      <ControlPanel />
    </div>
  );
};

export default ControlPanelPage;