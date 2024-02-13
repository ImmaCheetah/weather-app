import "./style.css";

export default async function getWeatherData(input) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=2131437186b046c39d7223234240802&q=${input}&aqi=no`, {mode: 'cors'})
        const getData = await response.json();

        getTodayCondition(getData);
        getLocation(getData);
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

const searchField = document.querySelector('.search-field');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log();
    getWeatherData(searchField.value.toString());
})

// getWeatherData('toronto');


// data needed
// 3 day forecast
// week day
// temperature
// weather description
// humidity
// city and country name

