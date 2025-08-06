import React from 'react';

const TemperatureToggle = ({ isCelsius, onToggle }) => {
  return (
    <div className="temperature-toggle">
      <button 
        onClick={onToggle}
        className={`toggle-btn ${isCelsius ? 'active' : ''}`}
      >
        °C
      </button>
      <button 
        onClick={onToggle}
        className={`toggle-btn ${!isCelsius ? 'active' : ''}`}
      >
        °F
      </button>
    </div>
  );
};

export default TemperatureToggle;