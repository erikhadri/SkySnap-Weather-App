document.getElementById("get-hourly-btn").addEventListener("click", function() {
    const city = document.getElementById("city-input").value.trim(); // Get value from the search bar
  
    if (city === "") {
        alert("Please enter a city or country!");
        return;
    }
  
    // Fetch hourly forecast data
    fetchHourlyForecast(city);
});

document.getElementById("reset-btn").addEventListener("click", function() {
    // Clear the input field
    document.getElementById("city-input").value = "";

    // Hide the hourly forecast display section
    document.getElementById("hourly-forecast-info").classList.add("hidden");

    // Clear the forecast data
    document.getElementById("hourly-forecast").innerHTML = "";
});

// Back to Home Button
document.getElementById("back-home-btn").addEventListener("click", function() {
    window.location.href = "index.html"; // Redirects to the homepage
});

function fetchHourlyForecast(city) {
    const apiKey = "aa2289b867413948ecb7909c5dc96079"; // Your API key for OpenWeatherMap
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert("City not found!");
                return;
            }

            // Extract the weather data from the API response
            const locationName = data.city.name;
            const hourlyData = data.list.slice(0, 12); // Get the first 12 hours of forecast

            // Update location name
            document.getElementById("location-name").textContent = `${locationName}, ${data.city.country}`;

            // Create hourly forecast display
            const hourlyForecastContainer = document.getElementById("hourly-forecast");
            hourlyForecastContainer.innerHTML = ''; // Clear previous data

            hourlyData.forEach(hour => {
                const time = new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const temperature = hour.main.temp;
                const weatherDescription = hour.weather[0].description;
                const weatherIcon = hour.weather[0].icon;

                // Create the HTML elements for each hourly forecast
                const forecastItem = document.createElement("div");
                forecastItem.classList.add("p-4", "bg-blue-100", "rounded-lg", "shadow-sm", "text-center");

                forecastItem.innerHTML = `
                    <p class="font-semibold">${time}</p>
                    <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon" class="w-12 h-12 mx-auto">
                    <p class="text-lg">${temperature}°C</p>
                    <p class="text-sm">${weatherDescription}</p>
                `;

                // Append the forecast item to the container
                hourlyForecastContainer.appendChild(forecastItem);
            });

            // Show the hourly forecast info section
            document.getElementById("hourly-forecast-info").classList.remove("hidden");
        })
        .catch(error => {
            console.error("Error fetching hourly forecast data:", error);
            alert("Error fetching hourly forecast data.");
        });
}
