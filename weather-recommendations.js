document.getElementById('getRecommendation').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    const apiKey = 'aa2289b867413948ecb7909c5dc96079';
  
    if (city === '') {
        alert('Please enter a city!');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const temperature = data.main.temp;
            const weatherDescription = data.weather[0].description;
            const recommendation = getWeatherRecommendation(temperature, weatherDescription);
            document.getElementById('recommendationOutput').innerHTML = recommendation;
        })
        .catch(error => {
            console.log('Error:', error);
            alert('Failed to fetch weather data');
        });
});

function getWeatherRecommendation(temp, description) {
    let clothingRecommendation = '';

    if (temp < 10) {
        clothingRecommendation = 'It\'s cold, wear a coat and scarf!';
    } else if (temp >= 10 && temp < 20) {
        clothingRecommendation = 'It\'s cool, wear a jacket!';
    } else if (temp >= 20 && temp < 30) {
        clothingRecommendation = 'It\'s warm, wear a t-shirt!';
    } else {
        clothingRecommendation = 'It\'s hot, wear light clothing!';
    }

    if (description.includes('rain')) {
        clothingRecommendation += ' Don\'t forget your umbrella!';
    }

    return `<p>${clothingRecommendation}</p>`;
}

// Reset button functionality
document.getElementById('resetRecommendation').addEventListener('click', function() {
    document.getElementById('city').value = ''; // Clear input field
    document.getElementById('recommendationOutput').innerHTML = ''; // Clear recommendation output
});

// Back to Home Button
document.getElementById("back-home-btn").addEventListener("click", function() {
    window.location.href = "index.html"; // Redirects to the homepage
});