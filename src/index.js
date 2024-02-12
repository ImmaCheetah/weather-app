import "./style.css";

async function getWeatherData(input) {
    try {
        // let location = "london";
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=2131437186b046c39d7223234240802&q=${input}&aqi=no`, {mode: 'cors'})
        const getData = await response.json();
        
        let location = `${getData.location.name}, ${getData.location.country}`;

        let todayCondition = `${getData.current.condition.text}`;

        console.log(getData);
        console.log(location);
        console.log(todayCondition);
    } catch(error) {
        console.log(error);
    }

}

getWeatherData('toronto');


// data needed
// 3 day forecast
// week day
// temperature
// weather description
// humidity
// city and country name
