import React from 'react';

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

export default SearchBox;