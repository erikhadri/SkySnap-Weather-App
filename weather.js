document.getElementById("get-weather-btn").addEventListener("click", function() {
  const cityName = document.getElementById("city-name").value;
  const apiKey = "852bedf678dfd94252a35982c3d2ac45";
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(apiURL)
      .then(response => response.json())
      .then(data => {
          if (data.cod === 200) {
              // Get weather data
              const weather = data.weather[0];
              const main = data.main;
              const wind = data.wind;

              // Update weather info in the UI
              document.getElementById("city").innerText = `${data.name}, ${data.sys.country}`;
              document.getElementById("weather-description").innerText = weather.description;
              document.getElementById("temperature").innerText = `${main.temp}°C`;
              document.getElementById("humidity").innerText = `${main.humidity}%`;
              document.getElementById("wind-speed").innerText = `${wind.speed} m/s`;
              document.getElementById("feels-like").innerText = `${main.feels_like}°C`;

              // Set weather icon
              const weatherIcon = `http://openweathermap.org/img/wn/${weather.icon}.png`;
              document.getElementById("weather-icon").src = weatherIcon;

              // Show the weather info section
              document.getElementById("weather-info").classList.remove("hidden");
          } else {
              alert("City not found. Please try again.");
          }
      })
      .catch(error => {
          console.log(error);
          alert("Something went wrong. Please try again later.");
      });
});
