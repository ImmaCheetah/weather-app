import "./style.css";

import { displayToday, displayForecast, toggleTemp, clearDisplay, clearError } from "./dom.js";

async function getWeatherData(input) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=2131437186b046c39d7223234240802&q=${input}&days=4&aqi=no&alerts=no`,
      { mode: "cors" },
    );
    const getData = await response.json();

    return getData;

  } catch (error) {
    console.log(error);
  }
}

function searchError() {
  const message = document.querySelector('.error-msg')

  message.textContent = "Can't find that city";
}

function getTodayCondition(data) {
  let todayCondition = {
    feelsLikeC: data.current.feelslike_c,
    tempC: data.current.temp_c,
    feelsLikeF: data.current.feelslike_f,
    tempF: data.current.temp_f,
    humidity: data.current.humidity,
    conditionText: data.current.condition.text,
    conditionIcon: data.current.condition.icon,
  };

  return todayCondition;
}

function getLocation(data) {
  let myLocation = {
    country: data.location.country,
    name: data.location.name,
    localTime: data.location.localtime,
  };

  return myLocation;
}

function getForecast(data, dayNumber) {
  let myForecast = {
    day: {
      test: data.forecast.forecastday[dayNumber],
      date: data.forecast.forecastday[dayNumber].date,
      highTempC: data.forecast.forecastday[dayNumber].day.maxtemp_c,
      lowTempC: data.forecast.forecastday[dayNumber].day.mintemp_c,
      avgTempC: data.forecast.forecastday[dayNumber].day.avgtemp_c,
      highTempF: data.forecast.forecastday[dayNumber].day.maxtemp_f,
      lowTempF: data.forecast.forecastday[dayNumber].day.mintemp_f,
      avgTempF: data.forecast.forecastday[dayNumber].day.avgtemp_f,
      conditionText: data.forecast.forecastday[dayNumber].day.condition.text,
      conditionIcon: data.forecast.forecastday[dayNumber].day.condition.icon,
    },
  };

  return myForecast;
}

const searchField = document.querySelector(".search-field");
const toggleBtn = document.querySelector(".toggle");
const form = document.getElementById("main-form");

form.addEventListener("submit", (e) => {
  if (!form.checkValidity()) {
    searchError();
  } else {
    clearError();
    clearDisplay();
    displayToday(searchField.value.toString());
    displayForecast(searchField.value.toString());
  }
  e.preventDefault();
});

toggleBtn.addEventListener("click", (e) => {
  toggleTemp();
  clearDisplay();
  clearError();
  displayToday(searchField.value.toString());
  displayForecast(searchField.value.toString());
})

export {
  getWeatherData,
  getForecast,
  getLocation,
  getTodayCondition,
  searchError,
};
