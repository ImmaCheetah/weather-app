import "./style.css";

async function getWeatherData(input) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=2131437186b046c39d7223234240802&q=${input}&days=3&aqi=no&alerts=no
        `, {mode: 'cors'})
        const getData = await response.json();

        // getTodayCondition(getData);
        // getLocation(getData);
        console.log(getData);
        return getData;

        // do everything here
    } catch(error) {
        console.log(error);
    }
}

// async function getForecastData(input) {
//     try {
//         const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=2131437186b046c39d7223234240802&q=${input}&days=3&aqi=no&alerts=no
//         `, {mode: 'cors'})
//         const getData = await response.json();
//         console.log(getData);
//         return getData;
//     } catch(error) {
//         console.log(error);
//     }
// }

function getTodayCondition(data) {
    let todayCondition = {
        feelsLikeC: data.current.feelslike_c,
        tempC: data.current.temp_c,
        humidity: data.current.humidity,
        conditionText: data.current.condition.text,
        conditionIcon: data.current.condition.icon
    };

    console.log(todayCondition);
    return todayCondition;
}

function getLocation(data) {
    let myLocation = {
        country: data.location.country,
        name: data.location.name,
        localTime: data.location.localtime
    }

    console.log(myLocation);
    return myLocation;
}

function getForecast(data) {
    let myForecast = {
        dayOne: {
            highTemp: data.forecast[0],
        }
    }

    console.log(myForecast);
    return myForecast;
}

async function displayData(input) {
    const content = document.getElementById('content');
    const weatherData = await getWeatherData(input);

    const location = getLocation(weatherData);
    const condition = await getTodayCondition(weatherData);
    
    console.log(location.country);
    // content.textContent = `This is in ${location.country}, and the weather be ${condition.conditionText}`;
}

const searchField = document.querySelector('.search-field');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();

    // displayData(searchField.value.toString());
    displayToday(searchField.value.toString());
})

async function displayToday(input) {
    const weatherData = await getWeatherData(input);
    const location = getLocation(weatherData);
    const condition = getTodayCondition(weatherData);
    const locationText = document.querySelector('.location');
    const tempText = document.querySelector('.temp');
    const conditionText = document.querySelector('.condition');
    const feelsLikeText = document.querySelector('.feels-like');


    locationText.textContent = `${location.name}, ${location.country}`;
    tempText.textContent = `${condition.tempC}° degrees`;
    conditionText.textContent = `${condition.conditionText}`;
    feelsLikeText.textContent = `Feels like ${condition.feelsLikeC}`;

    getForecast(weatherData);
}


