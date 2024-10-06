const locations = [
    { name: "Oslo, Norway", lat: 59.9139, lon: 10.7522 },
    { name: "New York, USA", lat: 40.7128, lon: -74.0060 },
    { name: "Tokyo, Japan", lat: 35.6762, lon: 139.6503 },
    { name: "Sydney, Australia", lat: -33.8688, lon: 151.2093 },
    { name: "Rio de Janeiro, Brazil", lat: -22.9068, lon: -43.1729 }
];

async function fetchWeather(lat, lon) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    return await response.json();
}

function updateWeatherDisplay(location, weatherData) {
    const weatherElement = document.querySelector(`.weather-location[data-name="${location.name}"] .weather-data`);
    weatherElement.innerHTML = `
        <p>Temperature: ${weatherData.current_weather.temperature}°C</p>
        <p>Wind Speed: ${weatherData.current_weather.windspeed} km/h</p>
        <p>Wind Direction: ${weatherData.current_weather.winddirection}°</p>
        <p>Weather Code: ${weatherData.current_weather.weathercode}</p>
        <p>Last Updated: ${weatherData.current_weather.time}</p>
    `;
}

async function updateAllWeather() {
    for (const location of locations) {
        try {
            const weatherData = await fetchWeather(location.lat, location.lon);
            updateWeatherDisplay(location, weatherData);
        } catch (error) {
            console.error(`Error fetching weather for ${location.name}:`, error);
        }
    }
}

// Update weather every 5 minutes
setInterval(updateAllWeather, 5 * 60 * 1000);

// Initial update
document.addEventListener('DOMContentLoaded', updateAllWeather);