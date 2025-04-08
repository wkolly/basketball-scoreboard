import React, { useState } from 'react';
import { useScoreboard } from '../../contexts/ScoreboardContext';
import { useGameClock } from '../../hooks/useGameClock';

const ClockControl: React.FC = () => {
  const { state } = useScoreboard();
  const { clock } = state;
  const { resetClock, toggleClock } = useGameClock();
  
  const [minutes, setMinutes] = useState(12);
  const [seconds, setSeconds] = useState(0);
  
  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setMinutes(isNaN(value) ? 0 : Math.max(0, Math.min(60, value)));
  };
  
  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSeconds(isNaN(value) ? 0 : Math.max(0, Math.min(59, value)));
  };
  
  const handleResetClock = () => {
    resetClock(minutes, seconds);
  };
  
  // Preset quarter lengths
  const presetTimes = [
    { name: '12:00', minutes: 12, seconds: 0 },
    { name: '10:00', minutes: 10, seconds: 0 },
    { name: '8:00', minutes: 8, seconds: 0 },
    { name: '5:00', minutes: 5, seconds: 0 },
    { name: '2:00', minutes: 2, seconds: 0 },
    { name: '1:00', minutes: 1, seconds: 0 },
    { name: '0:30', minutes: 0, seconds: 30 },
    { name: '0:24', minutes: 0, seconds: 24 },
    { name: '0:10', minutes: 0, seconds: 10 },
  ];

  return (
    <div className="control-section">
      <h3 className="control-title">Clock Controls</h3>
      
      {/* Current Clock Display */}
      <div style={{ textAlign: "center", marginBottom: "15px", padding: "10px", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
        <span style={{ fontSize: "28px", fontFamily: "monospace", fontWeight: "bold" }}>
          {`${clock.minutes.toString().padStart(2, '0')}:${clock.seconds.toString().padStart(2, '0')}`}
          {clock.minutes === 0 && `.${clock.tenths}`}
        </span>
        <div style={{ fontSize: "14px", color: "#666", marginTop: "5px" }}>
          Clock is {clock.isRunning ? 'running' : 'stopped'}
        </div>
      </div>
      
      {/* Start/Stop Button */}
      <div style={{ marginBottom: "15px" }}>
        <button
          onClick={toggleClock}
          style={{ 
            width: "100%", 
            padding: "12px", 
            fontSize: "16px", 
            fontWeight: "bold",
            backgroundColor: clock.isRunning ? "#e74c3c" : "#2ecc71",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          {clock.isRunning ? 'STOP CLOCK' : 'START CLOCK'}
        </button>
      </div>
      
      {/* Set Clock Section */}
      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}>Set Clock Time</h4>
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ width: "50%" }}>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Minutes</label>
            <input
              type="number"
              min="0"
              max="60"
              value={minutes}
              onChange={handleMinutesChange}
              style={{ 
                width: "100%", 
                padding: "8px", 
                borderRadius: "4px", 
                border: "1px solid #ddd" 
              }}
            />
          </div>
          <div style={{ width: "50%" }}>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Seconds</label>
            <input
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={handleSecondsChange}
              style={{ 
                width: "100%", 
                padding: "8px", 
                borderRadius: "4px", 
                border: "1px solid #ddd" 
              }}
            />
          </div>
        </div>
        <button
          onClick={handleResetClock}
          style={{ 
            width: "100%", 
            marginTop: "10px", 
            padding: "8px", 
            backgroundColor: "#3498db", 
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Set Clock
        </button>
      </div>
      
      {/* Quick Preset Times */}
      <div>
        <h4 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}>Quick Presets</h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
          {presetTimes.map((preset, index) => (
            <button
              key={index}
              onClick={() => {
                resetClock(preset.minutes, preset.seconds);
              }}
              style={{ 
                padding: "6px", 
                border: "1px solid #ddd", 
                borderRadius: "4px", 
                backgroundColor: "#f8f8f8",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#eaeaea";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#f8f8f8";
              }}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClockControl;