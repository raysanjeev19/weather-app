import React, { useState } from 'react';
import SearchBox from './components/SearchBox';
import WeatherCard from './components/WeatherCard';
import TemperatureToggle from './components/TemperatureToggle';
import { getWeatherByCity } from './services/weatherService';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [isCelsius, setIsCelsius] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchLocation = async () => {
    if (!location.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const units = isCelsius ? 'metric' : 'imperial';
      const weatherData = await getWeatherByCity(location, units);
      setData(weatherData);
      console.log(weatherData);
    } catch (err) {
      setError('City not found. Please try again.');
      setData({});
    } finally {
      setLoading(false);
      setLocation('');
    }
  };

  const toggleTemperature = async () => {
    setIsCelsius(!isCelsius);
    
    // Agar data hai to units change karke new data fetch karo
    if (data.name) {
      try {
        const units = !isCelsius ? 'metric' : 'imperial';
        const weatherData = await getWeatherByCity(data.name, units);
        setData(weatherData);
      } catch (err) {
        console.error('Error fetching weather data:', err);
      }
    }
  };

  return (
    <div className="app">
      <TemperatureToggle 
        isCelsius={isCelsius} 
        onToggle={toggleTemperature} 
      />
      
      <SearchBox 
        location={location}
        setLocation={setLocation}
        onSearch={searchLocation}
      />
      
      {loading && (
        <div className="loading">
          <p>Loading weather data...</p>
        </div>
      )}
      
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
      
      <WeatherCard 
        data={data} 
        isCelsius={isCelsius} 
      />
    </div>
  );
}

export default App;