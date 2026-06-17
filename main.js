const weatherButton = document.getElementById("weatherBtn");
const citySelect = document.getElementById("city");
const weatherResult = document.getElementById("weatherResult");

// Replace this with your real WeatherAPI key
const apiKey = "8b90df94bd844162ab925410261506";

weatherButton.addEventListener("click", getWeather);

function getWeather() {
  const city = citySelect.value;

  weatherResult.innerHTML = "<p>Loading weather...</p>";

  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`)
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Weather data not found");
      }

      return response.json();
    })
    .then(function(data) {
      displayWeather(data);
    })
    .catch(function(error) {
      weatherResult.innerHTML = `
        <p>Weather could not load.</p>
        <p>Please check your API key.</p>
      `;
      console.log(error);
    });
}

function displayWeather(data) {
  weatherResult.innerHTML = `
    <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
    <h2>${data.location.name}, ${data.location.country}</h2>
    <p class="temperature">${data.current.temp_c}°C</p>
    <p class="condition">${data.current.condition.text}</p>
    <div class="extra-info">
      <p>Humidity: ${data.current.humidity}%</p>
      <p>Wind: ${data.current.wind_kph} km/h</p>
    </div>
  `;
}