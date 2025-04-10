
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY; 

// Get city coordinates to feed to getWeatherByCoords
//might depricate for getForcast()
export const getCityCoordinates = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        if (!data || data.length === 0) {
            throw new Error('City not found');
        }
        return {
            lat: data[0].lat,
            lon: data[0].lon,
        };
    } catch (error) {
        throw error;
    }
};

// Get weather data by coordinates to get the weather data
export const getWeatherByCoords = async (lat, lon) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

//5 day
export const getForecast = async (lat, lon) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};