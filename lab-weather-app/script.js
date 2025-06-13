const getForecastBtn = document.getElementById("get-forecast");
const citySelect = document.getElementById("city-select");
const weatherDisplay = document.getElementById("weather-display");

const weatherIcon = document.getElementById("weather-icon");
const mainTemp = document.getElementById("main-temperature");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windGust = document.getElementById("wind-gust");
const weatherMain = document.getElementById("weather-main");
const locationText = document.getElementById("location");

async function getWeather(city) {
    const apiUrl = `https://weather-proxy.freecodecamp.rocks/api/weather?q=${city}`;
    try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Network response was not ok");
        return await res.json();
    } catch (error) {
        console.error("Error fetching weather:", error);
        throw error;
    }
}

async function showWeather(city) {
    try {
        const data = await getWeather(city);

        if (!data || !data.main || !data.weather || !data.wind) {
            throw new Error("Invalid data");
        }

        const weather = data.weather[0] || {};
        const icon = weather.icon || "";
        const temp = data.main.temp ?? "N/A";
        const feels = data.main.feels_like ?? "N/A";
        const hum = data.main.humidity ?? "N/A";
        const windSpeed = data.wind.speed ?? "N/A";
        const gust = data.wind.gust ?? "N/A";
        const main = weather.main || "N/A";
        const loc = `${data.name}, ${data.sys?.country ?? ""}`;

        weatherIcon.src = icon;
        weatherIcon.alt = main || "Weather Icon";
        mainTemp.textContent = `Temperature: ${temp} °C`;
        feelsLike.textContent = `Feels Like: ${feels} °C`;
        humidity.textContent = `Humidity: ${hum}%`;
        wind.textContent = `Wind: ${windSpeed} m/s`;
        windGust.textContent = `Wind Gust: ${gust !== "N/A" ? gust + " m/s" : "N/A"}`;
        weatherMain.textContent = `Condition: ${main}`;
        locationText.textContent = `Location: ${loc}`;

        weatherDisplay.style.display = "block";
    } catch (err) {
        alert("Something went wrong, please try again later.");
        weatherDisplay.style.display = "none";
    }
}

getForecastBtn.addEventListener("click", () => {
    const selectedCity = citySelect.value.trim();
    if (selectedCity) {
        showWeather(selectedCity);
    }
});
