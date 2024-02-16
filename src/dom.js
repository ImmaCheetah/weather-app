import { format } from "date-fns";
import {
  getWeatherData,
  getForecast,
  getLocation,
  getTodayCondition,
  searchError,
} from "./index.js";

let i = 0;
let celsius = true;

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
    conditionIcon.src = condition.conditionIcon;
    conditionText.textContent = `${condition.conditionText}`;

    if (celsius) {
        tempText.textContent = `${condition.tempC} °C`;
        feelsLikeText.textContent = `Feels like ${condition.feelsLikeC} °C`;
    } else {
        tempText.textContent = `${condition.tempF} °F`;
        feelsLikeText.textContent = `Feels like ${condition.feelsLikeF} °F`;
    }

  } catch (error) {
    console.log(error);
    searchError();
  }
}

async function displayForecast(input) {
  try {
    const weatherData = await getWeatherData(input);
    const forecastDiv = document.querySelectorAll(".day-div");

    forecastDiv.forEach((div) => {
      console.log(i);
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
      conditionIcon.src = forecast.day.conditionIcon;
      

      if (celsius) {
        highTemp.textContent = `Hi: ${forecast.day.highTempC} °C`;
        lowTemp.textContent = `Lo: ${forecast.day.lowTempC} °C`;
        avgTemp.textContent = `${forecast.day.avgTempC} °C`;
      } else {
        highTemp.textContent = `Hi: ${forecast.day.highTempF} °F`;
        lowTemp.textContent = `Lo: ${forecast.day.lowTempF} °F`;
        avgTemp.textContent = `${forecast.day.avgTempF} °F`;
      }

      conditionDiv.appendChild(conditionIcon);
      conditionDiv.appendChild(conditionText);
      div.appendChild(dayName);
      div.appendChild(conditionDiv);
      div.appendChild(avgTemp);
      div.appendChild(highTemp);
      div.appendChild(lowTemp);
    });
    i = 0;
  } catch (error) {
    console.log("forecast error", error);
    searchError();
    i = 0;
  }
}

function toggleTemp() {
    if (celsius) {
        celsius = false;
    } else {
        celsius = true;
    }
}

function clearError() {
    const errorMsg = document.querySelector('.error-msg');

    errorMsg.textContent = '';
}

function clearDisplay() {
    const dayDiv = document.querySelectorAll('.day-div');

    dayDiv.forEach((div) => {
        div.textContent = '';
    })
}

export { displayToday, displayForecast, toggleTemp, clearDisplay, clearError };
