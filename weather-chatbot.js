document.getElementById('askBot').addEventListener('click', function() {
    const query = document.getElementById('userQuery').value.trim();
    const apiKey = 'aa2289b867413948ecb7909c5dc96079';

    if (query === '') {
        alert('Please enter a question!');
        return;
    }

    // Basic query interpretation for the weather chatbot
    const cityMatch = query.match(/weather in (.+)/i);
    if (cityMatch && cityMatch[1]) {
        const city = cityMatch[1].trim();
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod !== 200) {
                    document.getElementById('chatOutput').innerHTML = 'Sorry, I could not find the weather information.';
                    return;
                }
                const temperature = data.main.temp;
                const description = data.weather[0].description;
                document.getElementById('chatOutput').innerHTML = `The weather in ${city} is ${temperature}°C with ${description}.`;
            })
            .catch(error => {
                console.log('Error:', error);
                document.getElementById('chatOutput').innerHTML = 'Sorry, there was an error retrieving the weather data.';
            });
    } else {
        document.getElementById('chatOutput').innerHTML = 'Sorry, I didn\'t understand the question. Try asking "weather in [city]"';
    }
});

// Reset button functionality
document.getElementById('resetBot').addEventListener('click', function() {
    document.getElementById('userQuery').value = ''; // Clear input field
    document.getElementById('chatOutput').innerHTML = ''; // Clear chatbot response
});

// Back to Home Button
document.getElementById("back-home-btn").addEventListener("click", function() {
    window.location.href = "index.html"; // Redirects to the homepage
});
