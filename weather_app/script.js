const apiKey = "d8a721fc13c95d47d690d471d17a9c18";  
const unsplashApiKey = "CyFmFekOFFNf-N3GYDAjmIfC3FL8NCLZOOsa94MlZvM";  // Replace with your Unsplash API Key
const searchButton = document.getElementById('search-btn');
const locationInput = document.getElementById('location');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const weatherDesc = document.getElementById('weather-desc');
const weatherIcon = document.getElementById('weather-icon');
const forecast = document.getElementById('forecast');

searchButton.addEventListener('click', () => {
  const location = locationInput.value;
  if (location) {
    getWeather(location);
  }
});

async function getWeather(location) {
  try {
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location},IN&appid=${apiKey}&units=metric`);
    const weatherData = await weatherResponse.json();

    if (weatherData.cod === 200) {
      const { name, main, weather } = weatherData;
      cityName.textContent = name;
      temperature.textContent = `${main.temp}°C`;
      weatherDesc.textContent = weather[0].description;
      weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;

      setBackgroundImage(location);  // Set background image after fetching weather data
      getForecast(location);
    } else {
      alert("Location not found!");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

async function setBackgroundImage(location) {
  try {
    const imageResponse = await fetch(`https://api.unsplash.com/photos/random?query=${location}&client_id=${unsplashApiKey}`);
    const imageData = await imageResponse.json();

    // Access the regular-sized image URL
    if (imageData && imageData.urls && imageData.urls.regular) {
      const imageUrl = imageData.urls.regular;
      document.body.style.backgroundImage = `url(${imageUrl})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    } else {
      console.error("No image found for the location or invalid API response.");
    }
  } catch (error) {
    console.error("Error fetching background image:", error);
  }
}

async function getForecast(location) {
  try {
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location},IN&appid=${apiKey}&units=metric`);
    const forecastData = await forecastResponse.json();

    if (forecastData.cod === "200") {
      const dailyForecast = forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 5);
      forecast.innerHTML = dailyForecast.map(item => {
        return `
          <div class="forecast-day">
            <h3>${new Date(item.dt * 1000).toLocaleDateString()}</h3>
            <p>${item.main.temp}°C</p>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="Weather Icon">
          </div>
        `;
      }).join('');
    }
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
}

navigator.geolocation.getCurrentPosition(function(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getWeatherByCoordinates(lat, lon);
});

async function getWeatherByCoordinates(lat, lon) {
  try {
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const weatherData = await weatherResponse.json();
    
    if (weatherData.cod === 200) {
      const { name, main, weather } = weatherData;
      cityName.textContent = name;
      temperature.textContent = `${main.temp}°C`;
      weatherDesc.textContent = weather[0].description;
      weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;

      setBackgroundImage(name);  // Set background image after fetching weather data
      getForecastByCoordinates(lat, lon);
    }
  } catch (error) {
    console.error("Error fetching weather data by coordinates:", error);
  }
}

async function getForecastByCoordinates(lat, lon) {
  try {
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const forecastData = await forecastResponse.json();

    if (forecastData.cod === "200") {
      const dailyForecast = forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 5);
      forecast.innerHTML = dailyForecast.map(item => {
        return `
          <div class="forecast-day">
            <h3>${new Date(item.dt * 1000).toLocaleDateString()}</h3>
            <p>${item.main.temp}°C</p>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="Weather Icon">
          </div>
        `;
      }).join('');
    }
  } catch (error) {
    console.error("Error fetching forecast data by coordinates:", error);
  }
}
