const API_KEY = process.env.OPENWEATHER_API_KEY;
const cityInput = document.getElementById('city_input');
const locationBtn = document.getElementById('searchBtn');


const getWeatherData = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    const data = await response.json();
    return data;
};

const updateWeatherApp = async () => {
    const city = cityInput.value;
    const weatherData = await getWeatherData(city);
    console.log(weatherData);
};

locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const weatherData = await getWeatherData(latitude, longitude);
            console.log(weatherData);
        });
    }
});




