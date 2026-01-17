import axios from 'axios';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const WEATHER_API_URL = process.env.REACT_APP_WEATHER_API_URL;

export const getCurrentWeather = async (query: string): Promise<string> => {
  try {
    console.log('Fetching weather for:', query);
    
    const response = await axios.get(
      `${WEATHER_API_URL}/current.json`,
      {
        params: {
          key: WEATHER_API_KEY,
          q: query,
          aqi: 'no'
        }
      }
    );
    
    console.log('Weather response:', response.data);
    
    if (response.data.current && response.data.current.temp_c) {
      return `${response.data.current.temp_c}°C`;
    }
    
    return '';
  } catch (error: any) {
    console.error('Error fetching weather:', error.response?.data || error.message);
    return '';
  }
};
