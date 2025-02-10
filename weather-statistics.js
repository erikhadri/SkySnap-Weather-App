document.getElementById('generateStats').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    const apiKey = 'aa2289b867413948ecb7909c5dc96079';
  
    if (city === '') {
        alert('Please enter a city!');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const dates = data.list.map(item => item.dt_txt);
            const temperatures = data.list.map(item => item.main.temp);
            generateChart(dates, temperatures);
        })
        .catch(error => {
            console.log('Error:', error);
            alert('Failed to fetch weather data');
        });
});

let weatherChart; // Store chart instance

function generateChart(labels, data) {
    const ctx = document.getElementById('weatherChart').getContext('2d');

    if (weatherChart) {
        weatherChart.destroy(); // Clear previous chart before creating a new one
    }

    weatherChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        }
    });
}

// Reset button functionality
document.getElementById('resetStats').addEventListener('click', function() {
    document.getElementById('city').value = ''; // Clear input field

    if (weatherChart) {
        weatherChart.destroy(); // Remove existing chart
        weatherChart = null; // Reset chart instance
    }
});


// Back to Home Button
document.getElementById("back-home-btn").addEventListener("click", function() {
    window.location.href = "index.html"; // Redirects to the homepage
});