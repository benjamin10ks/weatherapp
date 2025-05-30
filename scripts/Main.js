
import { weatherIconsMap, weatherEmojiMap } from '/scripts/WeatherIcons.js';
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
const tempMin = document.getElementById('temp-min');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const rain = document.getElementById('rain');


//Modes toggle
const modesToggle = document.getElementById('modes-toggle');
const backGround = document.querySelector('.body')

modesToggle.addEventListener('click', () => {
    backGround.classList.toggle('night--mode');
}); 

//5 day forecast
const forecast = document.getElementById('forecast');

const daysOfTheWeek = [
    'Sun',
    'Mon',
    'Tues',
    'Wed',
    'Thur',
    'Fri',
    'Sat'
];

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
    description.textContent = '';
    temp.textContent = '';
    feelsLike.textContent = '';
    humidity.textContent = '';
    tempMax.textContent = '';
    tempMin.textContent = '';
    sunrise.textContent = '';
    sunset.textContent = '';
    rain.textContent = '';


    // const sunriseTime = data.sys.sunrise * 1000;
    const sunriseUNIX = new Date(data.sys.sunrise * 1000);
    const newSunriseTime =  sunriseUNIX.toLocaleTimeString();

    const sunsetUNIX = new Date(data.sys.sunset * 1000);
    const newSunsetTime = sunsetUNIX.toLocaleTimeString();



    
    cityName.textContent = `${data.name} 📍`;
    description.textContent = data.weather[0].description;
    temp.textContent = `${Math.round(data.main.temp)}°F`;
    feelsLike.textContent = `Feels like ${Math.round(data.main.feels_like)}°F`;
    humidity.textContent = `Humidity will be ${data.main.humidity}%`;
    tempMax.textContent = `${Math.round(data.main.temp_max)}°F`;   
    tempMin.textContent = `${Math.round(data.main.temp_min)}°F`;
    sunrise.textContent = newSunriseTime;
    sunset.textContent = newSunsetTime;
    rain.textContent =  data.main.rain;

    console.log(rain);

    
};

const updateForecast = (data) => {
    const forecastArr = [
        data.list[0].main.temp, //day 1
        data.list[8].main.temp, 
        data.list[16].main.temp, 
        data.list[24].main.temp, 
        data.list[32].main.temp,
    ];
    const iconRef = [
        data.list[0].weather[0].main,
        data.list[8].weather[0].main,
        data.list[16].weather[0].main,
        data.list[24].weather[0].main,
        data.list[32].weather[0].main
    ];

    const today = new Date();

    const forecastDays = document.querySelectorAll('.forecast-day');

    forecastDays.forEach((dayElement, index) => {
        if(index < forecastArr.length){
            
            const day = new Date(today);
            day.setDate(today.getDate() + index);

            const dayName = index === 0 ? 'Today' : daysOfTheWeek[day.getDay()];
            dayElement.querySelector('.day-name').textContent = dayName;
            
            const temp = `${Math.round(forecastArr[index])}°`
            dayElement.querySelector('.day-temp').textContent = `${temp}`;
            
            const icon = weatherEmojiMap.get(iconRef[index]);
            dayElement.querySelector('.day-icon').textContent = icon;
            
        }
    })
}

//logic works just need images for the icons
const updateIcon = (data) => {
    const desc = data.weather[0].description
    weatherIcon.setAttribute('src', weatherIconsMap.get(desc));
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
            const forecast = await getForecast(coords.lat, coords.lon);
            console.log(weatherData);
            updateWeatherDisplay(weatherData);
            updateForecast(forecast);
            console.log(forecast);
            //updateIcon(weatherData);
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

