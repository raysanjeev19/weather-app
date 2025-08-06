import React, { useState, useEffect } from 'react';

const SearchBox = ({ location, setLocation, onSearch }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  const handleButtonClick = () => {
    onSearch();
  };

  return (
    <div className="search">
      <div className="search-container">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter Location"
          type="text"
          className="search-input"
        />
        <button 
          onClick={handleButtonClick}
          className="search-button"
          disabled={!location.trim()}
        >
          Enter
        </button>
      </div>
    </div>
  );
};

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <footer className="simple-footer">
      <div className="footer-content">
        <span>© 2025 Weather App.</span>
        <span>•</span>
        
        <span>Made with ❤️ by Sanjeev</span>
        <span>•</span>
        <span className="time-display"><strong>{formatTime(currentTime)}</strong></span>
        <span>•</span>
        <span>{formatDate(currentTime)}</span>
      </div>
    </footer>
  );
};

export default Footer;
export { SearchBox };