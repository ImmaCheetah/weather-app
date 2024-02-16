import { format } from "date-fns";
import {
    getWeatherData,
    getForecast,
    getLocation,
    getTodayCondition
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

async function displayDayOne(input) {
  try {
    const weatherData = await getWeatherData(input);
    const forecast = getForecast(weatherData);
    const conditionText = document.querySelector(".condition-one-text");
    const conditionIcon = document.querySelector(".condition-one-icon");
    const highTemp = document.querySelector(".high-temp-one");
    const lowTemp = document.querySelector(".low-temp-one");
    const avgTemp = document.querySelector(".avg-temp-one");
    const dayName = document.querySelector(".day-one-name");

    let tempDay = forecast.dayOne.date;
    console.log(tempDay);

    dayName.textContent = format(new Date(tempDay), "EEEE");
    conditionIcon.src = forecast.dayOne.conditionIcon;
    conditionText.textContent = forecast.dayOne.conditionText;
    highTemp.textContent = `Hi: ${forecast.dayOne.highTemp}`;
    lowTemp.textContent = `Lo: ${forecast.dayOne.lowTemp}`;
    avgTemp.textContent = `${forecast.dayOne.avgTemp} C`;
  } catch (error) {
    console.log(error);
    searchError();
  }
}

async function displayDayTwo(input) {
  try {
    const weatherData = await getWeatherData(input);
    const forecast = getForecast(weatherData);
    const conditionText = document.querySelector(".condition-two-text");
    const conditionIcon = document.querySelector(".condition-two-icon");
    const highTemp = document.querySelector(".high-temp-two");
    const lowTemp = document.querySelector(".low-temp-two");
    const avgTemp = document.querySelector(".avg-temp-two");
    const dayName = document.querySelector(".day-two-name");

    let tempDay = forecast.dayTwo.date;
    console.log(tempDay);

    dayName.textContent = format(new Date(tempDay), "EEEE");
    conditionIcon.src = forecast.dayTwo.conditionIcon;
    conditionText.textContent = forecast.dayTwo.conditionText;
    highTemp.textContent = `Hi: ${forecast.dayTwo.highTemp}`;
    lowTemp.textContent = `Lo: ${forecast.dayTwo.lowTemp}`;
    avgTemp.textContent = `${forecast.dayTwo.avgTemp} C`;
  } catch (error) {
    console.log(error);
    searchError();
  }
}

async function displayDayThree(input) {
  try {
    const weatherData = await getWeatherData(input);
    const forecast = getForecast(weatherData);
    const conditionText = document.querySelector(".condition-three-text");
    const conditionIcon = document.querySelector(".condition-three-icon");
    const highTemp = document.querySelector(".high-temp-three");
    const lowTemp = document.querySelector(".low-temp-three");
    const avgTemp = document.querySelector(".avg-temp-three");
    const dayName = document.querySelector(".day-three-name");

    let tempDay = forecast.dayThree.date;
    console.log(tempDay);

    dayName.textContent = format(new Date(tempDay), "EEEE");
    conditionIcon.src = forecast.dayThree.conditionIcon;
    conditionText.textContent = forecast.dayThree.conditionText;
    highTemp.textContent = `Hi: ${forecast.dayThree.highTemp}`;
    lowTemp.textContent = `Lo: ${forecast.dayThree.lowTemp}`;
    avgTemp.textContent = `${forecast.dayThree.avgTemp} C`;
  } catch (error) {
    console.log(error);
    searchError();
  }
}

export {
    displayDayOne,
    displayDayTwo,
    displayDayThree,
    displayToday
}