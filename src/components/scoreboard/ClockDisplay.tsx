import React from 'react';

interface ClockDisplayProps {
  time: string;
}

const ClockDisplay: React.FC<ClockDisplayProps> = ({ time }) => {
  return (
    <div className="clock-display">
      <div className="clock-time">
        {time}
      </div>
      <div className="stat-label">GAME CLOCK</div>
    </div>
  );
};

export default ClockDisplay;