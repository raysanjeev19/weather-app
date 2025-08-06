import React from 'react';

const SearchBox = ({ location, setLocation, onSearch }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="search">
      <input
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter Location"
        type="text"
      />
    </div>
  );
};

export default SearchBox;