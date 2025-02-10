document.getElementById('generateMap').addEventListener('click', function() {
  const city = document.getElementById('city').value.trim();
  const apiKey = 'aa2289b867413948ecb7909c5dc96079';

  if (city === '') {
      alert('Please enter a city!');
      return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
          if (data.cod === "404") {
              alert('City not found!');
              return;
          }

          const lat = data.coord.lat;
          const lon = data.coord.lon;
          loadWeatherMap(lat, lon);
      })
      .catch(error => {
          console.error('Error fetching weather data:', error);
          alert('Failed to fetch weather data.');
      });
});

function loadWeatherMap(lat, lon) {
  const mapContainer = document.getElementById('mapContainer');
  const mapUrl = `https://openweathermap.org/weathermap?lat=${lat}&lon=${lon}&zoom=10&layer=precipitation&appid=aa2289b867413948ecb7909c5dc96079`;

  // Display the map using an iframe
  mapContainer.innerHTML = `<iframe src="${mapUrl}" width="100%" height="100%" class="rounded-md border-none"></iframe>`;
}

// Reset button functionality
document.getElementById('resetMap').addEventListener('click', function() {
  document.getElementById('city').value = ''; // Clear input field
  document.getElementById('mapContainer').innerHTML = `<p class="text-gray-500">Weather map will appear here</p>`; // Reset map
});

// Back to Home Button
document.getElementById("back-home-btn").addEventListener("click", function() {
  window.location.href = "index.html"; // Redirects to the homepage
});