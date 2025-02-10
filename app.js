document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "05a44eaa9785cb35e2ebcd5d30eb5ca8"; // Replace with your OpenWeatherMap API key
    const weatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityInput = document.getElementById("city-name");
    
    weatherBtn.addEventListener("click", async () => {
        const city = cityInput.value.trim();
        if (!city) {
            weatherInfo.innerHTML = `<p class="text-red-500">Please enter a city name.</p>`;
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${"05a44eaa9785cb35e2ebcd5d30eb5ca8"}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("City not found");
            const data = await response.json();

            weatherInfo.innerHTML = `
                <div class="p-4 bg-white shadow-md rounded-md">
                    <h2 class="text-xl font-bold text-gray-800">${data.name}, ${data.sys.country}</h2>
                    <p class="text-lg">🌡️ Temperature: ${data.main.temp}°C</p>
                    <p>☁️ Weather: ${data.weather[0].description}</p>
                    <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
                </div>
            `;
        } catch (error) {
            weatherInfo.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
        }
    });

    // Back to home button functionality (if needed)
    document.getElementById("back-to-home-btn").addEventListener("click", () => {
        window.location.href = "index.html"; // Adjust as needed
    });
});
