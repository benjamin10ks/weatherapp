
import { weatherIconsMap } from '/scripts/WeatherIcons.js';

const API_KEY = 'ed1f93bc05b1f1f3bfaa19950d3ff8a6'; // Replace with API key in .env file'

const searchBar = document.getElementById('search-bar');
//const searchBtn = document.getElementById('searchBtn');

const cityName = document.getElementById('city-name');
const description = document.getElementById('description');
const temp = document.getElementById('temperature');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
=======

>>>>>>> Stashed changes
=======

>>>>>>> Stashed changes

const weatherIcon = document.getElementById('weather-icon')
//const locationBtn = document.getElementByClassName('loactionBtn');

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
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&humidity=${humidity}&appid=${API_KEY}&units=imperial`);
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
//to display data:
//use the data.parentDir.displaydata
//for example if you want to show the current coordinates
//you do data.coord.lat, data.coord.lon
//for weather since its an array its a little different\
//first you refernce data.weather
//then you pass in the index you want to reference
//so data.weather[1].icon this gives you the openweather icon 
const updateWeatherDisplay = (data) => {
    cityName.textContent = '';
    description.textContent = '';
    temp.textContent = '';
    feelsLike.textContent = '';
    humidity.textContent = '';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    
    cityName.textContent = data.name;
    humidity.textContent = data.humidity;
    description.textContent = data.weather[0].description;
    temp.textContent = `${Math.round(data.main.temp)}°F`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°F`;
    humidity.textContent = `${data.main.humidity}%`;

    console.log(cityName);
    console.log(description);
    console.log(temp);
    console.log(feelsLike);
    console.log(humidity);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
    /*just trying to get humidity to show*/
>>>>>>> Stashed changes
=======
    /*just trying to get humidity to show*/
>>>>>>> Stashed changes
=======
    /*just trying to get humidity to show*/
>>>>>>> Stashed changes
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
searchBar.addEventListener('keydown', async (event) => {
    if(event.key === 'Enter'){
        console.log("Enter Pressed");
        const city = searchBar.value.trim();
        if (!city) {
            handleError(new Error('Please enter a city name'));
            return;
        }
        if(city === cityName.textContent){
            return;
        }
        try {
            const coords = await getCityCoordinates(city);
            const weatherData = await getWeatherByCoords(coords.lat, coords.lon);
            console.log(weatherData);
            updateWeatherDisplay(weatherData);
            ///updateIcon(weatherData);
        } catch (error) {
            handleError(error);
        }
    }
});
