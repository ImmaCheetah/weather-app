import { format } from "date-fns";
import {
  getWeatherData,
  getForecast,
  getLocation,
  getTodayCondition,
  searchError,
} from "./index.js";

async function displayToday(input) {
  try {
    const weatherData = await getWeatherData(input);
    const location = getLocation(weatherData);
    const condition = getTodayCondition(weatherData);
    const locationText = document.querySelector(".location");
    const tempText = document.querySelector(".temp");
    const conditionText = document.querySelector(".condition-text");
    const conditionIcon = document.querySelector(".condition-icon");
    const feelsLikeText = document.querySelector(".feels-like");

    locationText.textContent = `${location.name}, ${location.country}`;
    tempText.textContent = `${condition.tempC} C`;
    conditionIcon.src = condition.conditionIcon;
    conditionText.textContent = `${condition.conditionText}`;
    feelsLikeText.textContent = `Feels like ${condition.feelsLikeC}`;
  } catch (error) {
    console.log(error);
    searchError();
  }
}

let i = 0;
async function displayForecast(input) {
  try {
    const weatherData = await getWeatherData(input);
    const forecastDiv = document.querySelectorAll(".day-div");

    forecastDiv.forEach((div) => {
      const forecast = getForecast(weatherData, ++i);
      const conditionDiv = document.createElement("div");
      const conditionText = document.createElement("p");
      const conditionIcon = document.createElement("img");
      const highTemp = document.createElement("p");
      const lowTemp = document.createElement("p");
      const avgTemp = document.createElement("p");
      const dayName = document.createElement("h2");

      let tempDay = forecast.day.date;

      conditionDiv.classList.add("condition-div");
      conditionText.classList.add("condition-text");
      conditionIcon.classList.add("condition-icon");
      highTemp.classList.add("high-temp");
      lowTemp.classList.add("low-temp");
      avgTemp.classList.add("avg-temp");
      dayName.classList.add("day-name");

      dayName.textContent = format(
        new Date(tempDay.replace(/-/g, "/")),
        "EEEE",
      );
      conditionText.textContent = forecast.day.conditionText;
      console.log(conditionText);
      conditionIcon.src = forecast.day.conditionIcon;
      highTemp.textContent = `Hi: ${forecast.day.highTemp}`;
      lowTemp.textContent = `Lo: ${forecast.day.lowTemp}`;
      avgTemp.textContent = `${forecast.day.avgTemp} C`;

      conditionDiv.appendChild(conditionIcon);
      conditionDiv.appendChild(conditionText);
      div.appendChild(dayName);
      div.appendChild(conditionDiv);
      div.appendChild(avgTemp);
      div.appendChild(highTemp);
      div.appendChild(lowTemp);
    });
  } catch (error) {
    console.log("forecast error", error);
    searchError();
  }
}

export { displayToday, displayForecast };
