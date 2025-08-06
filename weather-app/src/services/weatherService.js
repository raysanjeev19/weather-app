import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city, units = 'metric') => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&units=${units}&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Weather data fetch karne mein error hai');
  }
};