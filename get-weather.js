const apiKey = 'aa2289b867413948ecb7909c5dc96079';

// Event listener for the 'Get Weather' button
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('get-weather-btn').addEventListener('click', async () => {
        const cityName = document.getElementById('city-name').value;
        if (cityName) {
            const weatherData = await getWeatherData(cityName);
            displayWeatherInfo(weatherData);
        } else {
            alert('Please enter a city name.');
        }
    });

    // Event listener for the 'Reset' button
    document.getElementById('reset-btn').addEventListener('click', () => {
        document.getElementById('city-name').value = '';  // Reset input field
        document.getElementById('weather-info').innerHTML = '';  // Clear weather info
    });

    // Event listener for the 'Back to Home' button
    document.getElementById('back-home-btn').addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirects back to homepage
    });
});

// Function to get the weather data from the OpenWeather API
async function getWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
}

// Function to display weather info on the page
function displayWeatherInfo(data) {
    const weatherInfoContainer = document.getElementById('weather-info');
    
    if (data.cod === 200) {
        const { name, main, weather, wind } = data;

        const temperature = main.temp;
        const description = weather[0].description;
        const humidity = main.humidity;
        const windSpeed = wind.speed;
        const icon = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;

        // Design for the weather output (keeping the page design intact)
        weatherInfoContainer.innerHTML = `
            <div class="bg-white p-6 rounded-xl shadow-lg text-center">
                <h2 class="text-2xl font-semibold text-gray-700 mb-2">${name}</h2>
                <div class="flex justify-center mb-4">
                    <img src="${icon}" alt="Weather Icon" class="w-20 h-20 object-contain">
                </div>
                <p class="text-xl text-gray-800 mb-2">${temperature}°C</p>
                <p class="text-gray-600 mb-2 capitalize">${description}</p>
                <p class="text-gray-500">Humidity: ${humidity}%</p>
                <p class="text-gray-500">Wind Speed: ${windSpeed} m/s</p>
            </div>
        `;
    } else {
        weatherInfoContainer.innerHTML = `
            <div class="bg-red-100 text-red-800 p-4 rounded-xl text-center">
                <p>City not found. Please try again.</p>
            </div>
        `;
    }
}
