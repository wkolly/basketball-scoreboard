import React from 'react';

interface PeriodDisplayProps {
  period: number;
  total: number;
}

const PeriodDisplay: React.FC<PeriodDisplayProps> = ({ period, total }) => {
  const periodText = period <= total ? `Q${period}` : 'OT';
  
  return (
    <div className="period-display">
      <div className="period-number">
        {periodText}
      </div>
      <div className="stat-label">PERIOD</div>
    </div>
  );
};

export default PeriodDisplay;