import useApiKey from "./key.js";

document.getElementById("weatherButton").addEventListener("click", getWeather);
const display = document.getElementById("weatherDisplay");

async function getWeather() {
  const location = document.getElementById("locationInput").value;
  const apiKey = useApiKey();
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  // call API
  try {
    const response = await (await fetch(apiUrl)).json();
    if (response.cod == "400") {
      if (response.message == "Nothing to geocode") {
        display.textContent = "location needed";
      }
    }

    const { description, icon } = response.weather[0];
    const { temp, feels_like } = response.main;

    const weather = `
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png"/>
          <p>It's ${description}</p>
          <p>It says it's ${temp}C outside</p>
          <p>it should feel like: ${feels_like}C</p>
    `;
    display.innerHTML = weather;
  } catch (e) {
    console.log("API error", e);
  }

  // set out weather data

  // Add weather data to DOM

  // add a catch
}
