import "./style.css";

import { displayToday, displayForecast } from "./dom.js";

async function getWeatherData(input) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=2131437186b046c39d7223234240802&q=${input}&days=4&aqi=no&alerts=no`,
      { mode: "cors" },
    );
    const getData = await response.json();

    console.log(getData);
    return getData;

    // do everything here
  } catch (error) {
    console.log(error);
    searchError();
  }
}

function searchError() {
  const searchDiv = document.querySelector(".search-div");
  const message = document.createElement("p");

  message.textContent = "Something went wrong";
  searchDiv.appendChild(message);
}

function getTodayCondition(data) {
  let todayCondition = {
    feelsLikeC: data.current.feelslike_c,
    tempC: data.current.temp_c,
    humidity: data.current.humidity,
    conditionText: data.current.condition.text,
    conditionIcon: data.current.condition.icon,
  };

  console.log(todayCondition);
  return todayCondition;
}

function getLocation(data) {
  let myLocation = {
    country: data.location.country,
    name: data.location.name,
    localTime: data.location.localtime,
  };

  console.log(myLocation);
  return myLocation;
}

function getForecast(data, dayNumber) {
  let myForecast = {
    day: {
      test: data.forecast.forecastday[dayNumber],
      date: data.forecast.forecastday[dayNumber].date,
      highTemp: data.forecast.forecastday[dayNumber].day.maxtemp_c,
      lowTemp: data.forecast.forecastday[dayNumber].day.mintemp_c,
      avgTemp: data.forecast.forecastday[dayNumber].day.avgtemp_c,
      conditionText: data.forecast.forecastday[dayNumber].day.condition.text,
      conditionIcon: data.forecast.forecastday[dayNumber].day.condition.icon,
    },
  };

  console.log(myForecast);
  return myForecast;
}

const searchField = document.querySelector(".search-field");
const searchBtn = document.querySelector(".search-btn");
const form = document.getElementById("main-form");

form.addEventListener("submit", (e) => {
  if (!form.checkValidity()) {
    searchError();
  } else {
    console.log("oi");
    displayToday(searchField.value.toString());
    displayForecast(searchField.value.toString());
  }
  e.preventDefault();
});

// searchBtn.addEventListener("click", (e) => {
//   e.preventDefault();

//   displayToday(searchField.value.toString());
//   displayDayOne(searchField.value.toString());
//   displayDayTwo(searchField.value.toString());
//   displayDayThree(searchField.value.toString());
// });

export {
  getWeatherData,
  getForecast,
  getLocation,
  getTodayCondition,
  searchError,
};
