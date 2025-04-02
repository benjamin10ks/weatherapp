const API_KEY = process.env.OPENWEATHER_API_KEY; 
const cityInput = document.getElementById('city_input');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('loactionBtn');
const weatherData = document.getElementById('weather-data');

const getWeatherByCity = async (city) => {
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

const getWeatherByCoords = async (lat, lon) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

const updateWeatherDisplay = (data) => {
    weatherData.textContent = '';
    
    const cityName = document.createElement('h2');
    cityName.textContent = data.name;
    weatherData.appendChild(cityName);

    const description = document.createElement('p');
    description.textContent = data.weather[0].description;
    weatherData.appendChild(description);

    const temperature = document.createElement('p');
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherData.appendChild(temperature);

    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherData.appendChild(humidity);

    const windSpeed = document.createElement('p');
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    weatherData.appendChild(windSpeed);
};

const handleError = (error) => {
    weatherData.textContent = error.message;
};

searchBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) {
        handleError(new Error('Please enter a city name'));
        return;
    }
    try {
        const data = await getWeatherByCity(city);
        updateWeatherDisplay(data);
    } catch (error) {
        handleError(error);
    }
});

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






