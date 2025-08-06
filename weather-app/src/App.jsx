import React, { useState } from 'react';
import SearchBox from './components/SearchBox';
import WeatherCard from './components/WeatherCard';
import TemperatureToggle from './components/TemperatureToggle';
import Footer from './components/Footer';
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
      
      {!data.name && !loading && !error && (
        <div className="welcome-message">
          <div className="welcome-content">
            <h2>🌤️ Welcome to Weather App</h2>
            <p>Get real-time weather information for any city around the world</p>
            <div className="welcome-features">
              <span>🌡️ Temperature & Feels Like</span>
              <span>💧 Humidity Levels</span>
              <span>💨 Wind Speed</span>
              <span>🔄 °C/°F Toggle</span>
            </div>
            <div className="welcome-instruction">
              <p>Enter a city name above to get started!</p>
            </div>
          </div>
        </div>
      )}
      
      <WeatherCard 
        data={data} 
        isCelsius={isCelsius} 
      />
      
      <Footer />
    </div>
  );
}

export default App;
