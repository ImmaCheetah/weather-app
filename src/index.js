import "./style.css";

async function getWeatherData(input) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=2131437186b046c39d7223234240802&q=${input}&aqi=no`, {mode: 'cors'})
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

async function displayData(input) {
    const content = document.getElementById('content');
    const weatherData = await getWeatherData(input);

    const location = getLocation(weatherData);
    const condition = await getTodayCondition(weatherData);
    
    console.log(location.country);
    content.textContent = `This is in ${location.country}, and the weather be ${condition.conditionText}`;
}

const searchField = document.querySelector('.search-field');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    // console.log();
    // getWeatherData();
    displayData(searchField.value.toString());
})


// getWeatherData('toronto');


// data needed
// 3 day forecast
// week day
// temperature
// weather description
// humidity
// city and country name
