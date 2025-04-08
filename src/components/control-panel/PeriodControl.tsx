import React from 'react';
import { useScoreboard } from '../../contexts/ScoreboardContext';

const PeriodControl: React.FC = () => {
  const { state, dispatch } = useScoreboard();
  const { period } = state;
  
  const handlePeriodChange = (value: number) => {
    dispatch({
      type: 'UPDATE_PERIOD',
      value
    });
  };
  
  return (
    <div className="control-section">
      <h3 className="control-title">Period Controls</h3>
      
      <div style={{ 
        textAlign: "center", 
        marginBottom: "15px", 
        padding: "10px", 
        backgroundColor: "#f0f0f0", 
        borderRadius: "8px" 
      }}>
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
          {period.current <= period.total ? `Quarter ${period.current}` : `Overtime ${period.current - period.total}`}
        </div>
      </div>
      
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <button
          onClick={() => handlePeriodChange(-1)}
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#f39c12", 
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: period.current <= 1 ? "not-allowed" : "pointer",
            opacity: period.current <= 1 ? 0.6 : 1
          }}
          disabled={period.current <= 1}
        >
          Previous
        </button>
        
        <button
          onClick={() => handlePeriodChange(1)}
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#2ecc71", 
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PeriodControl;