import "./style.css";

async function getWeatherData(input) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=2131437186b046c39d7223234240802&q=${input}&days=3&aqi=no&alerts=no`,
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

function getForecast(data) {
  let myForecast = {
    dayOne: {
      // test: data.forecast.forecastday[0],
      highTemp: data.forecast.forecastday[0].day.maxtemp_c,
      lowTemp: data.forecast.forecastday[0].day.mintemp_c,
      conditionText: data.forecast.forecastday[0].day.condition.text,
      conditionIcon: data.forecast.forecastday[0].day.condition.icon,
    },
    dayTwo: {
      highTemp: data.forecast.forecastday[1].day.maxtemp_c,
      lowTemp: data.forecast.forecastday[1].day.mintemp_c,
      conditionText: data.forecast.forecastday[1].day.condition.text,
      conditionIcon: data.forecast.forecastday[1].day.condition.icon,
    },
    dayThree: {
      highTemp: data.forecast.forecastday[2].day.maxtemp_c,
      lowTemp: data.forecast.forecastday[2].day.mintemp_c,
      conditionText: data.forecast.forecastday[2].day.condition.text,
      conditionIcon: data.forecast.forecastday[2].day.condition.icon,
    },
  };

  console.log(myForecast);
  return myForecast;
}

const searchField = document.querySelector(".search-field");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // displayData(searchField.value.toString());
  displayToday(searchField.value.toString());
  displayDayOne(searchField.value.toString());
  displayDayTwo(searchField.value.toString());
  displayDayThree(searchField.value.toString());
});

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
    tempText.textContent = `${condition.tempC}° degrees`;
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

    conditionIcon.src = forecast.dayOne.conditionIcon;
    conditionText.textContent = forecast.dayOne.conditionText;
    highTemp.textContent = `Hi: ${forecast.dayOne.highTemp}`;
    lowTemp.textContent = `Lo: ${forecast.dayOne.lowTemp}`;
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

    conditionIcon.src = forecast.dayTwo.conditionIcon;
    conditionText.textContent = forecast.dayTwo.conditionText;
    highTemp.textContent = `Hi: ${forecast.dayTwo.highTemp}`;
    lowTemp.textContent = `Lo: ${forecast.dayTwo.lowTemp}`;
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

    conditionIcon.src = forecast.dayThree.conditionIcon;
    conditionText.textContent = forecast.dayThree.conditionText;
    highTemp.textContent = `Hi: ${forecast.dayThree.highTemp}`;
    lowTemp.textContent = `Lo: ${forecast.dayThree.lowTemp}`;
  } catch (error) {
    console.log(error);
    searchError();
  }
}
