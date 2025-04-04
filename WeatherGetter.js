const API_KEY = ''; // Replace with API key in .env file
const cityInput = document.getElementById('city_input');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('loactionBtn');
const weatherData = document.getElementById('weather-data');
const temp = document.getElementById('temp');
const feelsLike = document.getElementById('feels-like');

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
    weatherData.textContent = '';
    temp.textContent = '';
    feelsLike.textContent = '';
    

    const cityName = document.createElement('h2');
    cityName.textContent = data.name;
    weatherData.appendChild(cityName);
    console.log(cityName);

    const description = document.createElement('p');
    description.textContent = data.weather[0].description;
    weatherData.appendChild(description);
    console.log(description);

    const temperature = document.createElement('p');
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    temp.textContent = temperature.textContent;
    weatherData.appendChild(temperature);
    console.log(temperature);

    const feelsLike = document.createElement('p');
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    feelsLike.textContent = feelsLike.textContent;
    weatherData.appendChild(feelsLike);
    console.log(feelsLike);

    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherData.appendChild(humidity);
    console.log(humidity);


    const windSpeed = document.createElement('p');
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    weatherData.appendChild(windSpeed);
    console.log(windSpeed);
};

const handleError = (error) => {
    weatherData.textContent = error.message;
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
        updateWeatherDisplay(weatherData);
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