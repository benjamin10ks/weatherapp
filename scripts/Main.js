
import { weatherIconsMap } from '/scripts/WeatherIcons.js';
import { getCityCoordinates, getForecast, getWeatherByCoords } from '/scripts/DataFetch.js';

const searchBar = document.getElementById('search-bar');

//large left main display
const cityName = document.getElementById('city-name');
const description = document.getElementById('description');
const temp = document.getElementById('temperature');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const weatherIcon = document.getElementById('weather-icon')
const tempMax = document.getElementById('temp-max');


//4day forecast
const forecast = document.getElementById('forecast');

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
    tempMax.textContent = '';

    cityName.textContent = data.name;
    description.textContent = data.weather[0].description;
    temp.textContent = `${Math.round(data.main.temp)}°F`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°F`;
    humidity.textContent = `Humidity will be ${data.main.humidity}%`;
    tempMax.textContent = data.main.temp_max;

 
    

    console.log(cityName);
    console.log(description);
    console.log(temp);
    console.log(feelsLike);
    console.log(humidity);
};

const updateForecast = () => {
    forecast.textContent = '';

    const forecastArr = {
        
    };
}

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

const wrapper = document.querySelector('.forecast-container');
let isDown = false;
let startX;
let scrollLeft;

wrapper.addEventListener('mousedown', (e) => {
  isDown = true;
  wrapper.classList.add('dragging');
  startX = e.pageX - wrapper.offsetLeft;
  scrollLeft = wrapper.scrollLeft;
});

document.addEventListener('mouseup', () => {
  if (isDown) {
    isDown = false;
    wrapper.classList.remove('dragging');
  }
});

document.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - wrapper.offsetLeft;
  const walk = (x - startX);
  wrapper.scrollLeft = scrollLeft - walk;
});

