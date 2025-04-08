import React, { useState } from 'react';
import { useScoreboard } from '../../contexts/ScoreboardContext';

const GameReset: React.FC = () => {
  const { dispatch } = useScoreboard();
  const [showConfirm, setShowConfirm] = useState(false);
  
  const handleResetClick = () => {
    setShowConfirm(true);
  };
  
  const handleConfirmReset = () => {
    dispatch({ type: 'RESET_GAME' });
    setShowConfirm(false);
  };
  
  const handleCancelReset = () => {
    setShowConfirm(false);
  };
  
  return (
    <div className="control-section">
      <h3 className="control-title">Game Management</h3>
      
      {!showConfirm ? (
        <button
          onClick={handleResetClick}
          style={{ 
            width: "100%", 
            padding: "12px", 
            backgroundColor: "#e74c3c", 
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.2s"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#c0392b";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#e74c3c";
          }}
        >
          Reset Game
        </button>
      ) : (
        <div>
          <p style={{ 
            fontSize: "14px", 
            color: "#555", 
            marginBottom: "10px", 
            textAlign: "center",
            padding: "10px",
            backgroundColor: "#fff3cd",
            borderRadius: "4px"
          }}>
            Are you sure you want to reset the game? All scores will be cleared.
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleConfirmReset}
              style={{ 
                flex: "1", 
                padding: "10px", 
                backgroundColor: "#e74c3c", 
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Yes, Reset
            </button>
            <button
              onClick={handleCancelReset}
              style={{ 
                flex: "1", 
                padding: "10px", 
                backgroundColor: "#95a5a6", 
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameReset;