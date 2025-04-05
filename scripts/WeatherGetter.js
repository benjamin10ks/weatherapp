
import { weatherIconsMap } from '/scripts/WeatherIcons.js';

const API_KEY = ''; // Replace with API key in .env file
const cityInput = document.getElementById('city_input');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('loactionBtn');
const cityName = document.getElementById('city-name');
const description = document.getElementById('description');
const temp = document.getElementById('temp');
const feelsLike = document.getElementById('feels-like');
const weatherIcon = document.getElementById('weather-icon')

// Get city coordinates to feed to getWeatherByCoords
const getCityCoordinates = async (city) => {
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
const getWeatherByCoords = async (lat, lon) => {
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

// Update weather display
const updateWeatherDisplay = (data) => {
    cityName.textContent = '';
    description.textContent = '';
    temp.textContent = '';
    feelsLike.textContent = '';
    
    cityName.textContent = data.name;
    console.log(cityName);

    description.textContent = data.weather[0].description;
    console.log(description);

    temp.textContent = `${Math.round(data.main.temp)}°C`;
    console.log(temp);

    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    console.log(feelsLike);
};

const updateIcon = (data) => {
    const desc = data.weather[0].description
    weatherIcon.setAttribute('name', weatherIconsMap.get(desc));
}
//this can be sent anywhere to the user just change the elem its targeting
const handleError = (error) => {
    cityName.textContent = error.message;
};

// Search button event listener
searchBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) {
        handleError(new Error('Please enter a city name'));
        return;
    }
    try {
        const coords = await getCityCoordinates(city);
        const weatherData = await getWeatherByCoords(coords.lat, coords.lon);
        console.log(weatherData);
        updateWeatherDisplay(weatherData);
        updateIcon(weatherData);
    } catch (error) {
        handleError(error);
    }
});

// Location button event listener
locationBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        handleError(new Error('Geolocation is not supported by your browser'));
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
                const data = await getWeatherByCoords(
                    position.coords.latitude,
                    position.coords.longitude
                );
                updateWeatherDisplay(data);
            } catch (error) {
                handleError(error);
            }
        },
        (error) => {
            handleError(new Error('Unable to retrieve your location'));
        }
    );
}); 