const apiKey = 'aaecf20d64c19366cf46c046efbc40df';
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';

const searchBar = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-button');
const mainInfoLocation = document.querySelector('.main-info-body h3');
const mainInfoTemp = document.querySelector('.main-info-text.temp');
const mainInfoWind = document.querySelector('.main-info-text.wind');
const mainInfoHumidity = document.querySelector('.main-info-text.humidity');
const fiveDayForecast = document.querySelector('.days-forcast');
const cards = document.querySelectorAll('.card-text');

searchButton.addEventListener('click', () => {
  const cityName = searchBar.value;
  getWeatherData(cityName);
});

function getWeatherData(cityName) {
  const apiUrlWithKey = `${apiUrl}${cityName}&units=metric&appid=${apiKey}`;

  fetch(apiUrlWithKey)
    .then((response) => response.json())
    .then((data) => {
      mainInfoLocation.textContent = data.city.name;
      mainInfoTemp.textContent = `Temp: ${data.list[0].main.temp}°C`;
      mainInfoWind.textContent = `Wind: ${data.list[0].wind.speed} m/s`;
      mainInfoHumidity.textContent = `Humidity: ${data.list[0].main.humidity}%`;

      for (let i = 0; i < 5; i++) {
        const date = new Date(data.list[i * 8].dt * 1000);
        cards[i].textContent = `Temp: ${data.list[i * 8].main.temp}°C`;
        cards[i].textContent += ` | Wind: ${data.list[i * 8].wind.speed} m/s`;
        cards[i].textContent += ` | Humidity: ${data.list[i * 8].main.humidity}%`;
        cards[i].previousElementSibling.textContent = date.toLocaleDateString();
      }
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      alert('City not found. Please enter a valid city name.');
    });
}
