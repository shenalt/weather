let isItPrecip;
let isItSnow;

var city = "New York"
const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dac6204ad1e6aa80dd131c7aa83cbc38`;

const searchbox = document.querySelector('.search-text');
searchbox.addEventListener('keypress', setQuery);

//const searchbutton = document.querySelector('search-btn');
//searchbutton.addEventListener('click', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults(query){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=dac6204ad1e6aa80dd131c7aa83cbc38`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`; 

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    let temperature = weather.main.temp;
    temperature = toFarenheit(temperature);
    temp.innerHTML = `${Math.round(temperature)}<span>°F</span>`;

    //let icon_ID = weather['weather'][0]['id'];
    let icon_ID = weather.weather[0].id;
    setIcons(icon_ID, document.querySelector('.icon'));

    let description = document.querySelector('.current .desc');
    description.innerText = weather.weather[0].main;

    let hi_low = document.querySelector('.current .hi-low');
    let max = weather.main.temp_min;
    max = toFarenheit(max);
    let min = weather.main.temp_max;
    min = toFarenheit(min);
    hi_low.innerText = `${Math.round(max)}°F / ${Math.round(min)}°F`
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 
        "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

function toFarenheit(temp){
    temp = (temp - 273.15) * (9/5) + 32;
    return temp;
}

function setIcons(iconID, icon){
    // icon is going to contain the doc query selector for the canvas icon class
    // iconID is going to contain the id sent from OpenWeatherMap
    const skycons = new Skycons({color: "pink "});
    let now = new Date();
    let hour = now.getHours();
    let skycons_id;
    skycons.play();

    if(hour < 18 && hour >=6){ // MORNING
        switch(iconID){
            /* GROUP 800: CLEAR */
            case 800: // clear sky Day
                skycons_id = "CLEAR_DAY";
                isItPrecip = false;
                isItSnow = false;
                return skycons.set(icon, Skycons[skycons_id]);
                break;
            /* GROUP 800: CLEAR */

            /* GROUP 80x: CLOUDS */
            case 801: // partly cloudy Day 
            case 802:
                skycons_id = "PARTLY_CLOUDY_DAY"
                isItPrecip = false;
                isItSnow = false;
                return skycons.set(icon, Skycons[skycons_id]);
                break;

            case 803: // cloudy
            case 804:
                skycons_id = "CLOUDY"
                isItPrecip = false;
                isItSnow = false;
                return skycons.set(icon, Skycons[skycons_id]);
                break;
            /* GROUP 80x: CLOUDS */

            /* GROUP 7xx: ATMOSPHERE */
            case 701: // fog
            case 711:
            case 721:
            case 731:
            case 741:
            case 751:
            case 761:
            case 762:
            case 771:
            case 781:
                skycons_id = "FOG"
                isItPrecip = false;
                isItSnow = false;
                return skycons.set(icon, Skycons[skycons_id]);
                break;
            /* GROUP 7xx: ATMOSPHERE */

            /* GROUP 6xx: SNOW */
            case 600: // snow
            case 601:
            case 602:
                skycons_id = "SNOW"
                isItPrecip = true;
                isItSnow = true;
                return skycons.set(icon, Skycons[skycons_id]);
                break;

            case 611: // sleet
            case 612:
            case 613:
                skycons_id = "SLEET"
                isItPrecip = true;
                isItSnow = true;
                return skycons.set(icon, Skycons[skycons_id]);
                break;

            case 615: // rain snow
            case 511: // freezing rain
                skycons_id = "RAIN_SNOW"
                isItPrecip = true;
                isItSnow = true;
                return skycons.set(icon, Skycons[skycons_id]);
                break;

            case 616: // rain snow showers Day
                skycons_id = "RAIN_SNOW_SHOWERS_DAY"
                isItPrecip = true;
                isItSnow = true;
                return skycons.set(icon, Skycons[skycons_id]);
                break;

            case 620: // snow showers Day
            case 621:
            case 622:
                skycons_id = "SNOW_SHOWERS_DAY"
                isItPrecip = true;
                isItSnow = true;
                return skycons.set(icon, Skycons[skycons_id]);
                break;
            /* GROUP 6xx: SNOW */

            /* GROUP 5xx: RAIN */
            case 500: // rain
            case 501:
            case 502:
            case 503:
            case 504:
                skycons_id = "RAIN"
                isItPrecip = true;
                isItSnow = false;
                return skycons.set(icon, Skycons[skycons_id]);
                break;
            
            case 520: // rain showers Day
            case 521:
            case 522:
            case 531:
                skycons_id = "SHOWERS_DAY"
                isItPrecip = true;
                isItSnow = false;
                return skycons.set(icon, Skycons[skycons_id]);
                break;
            /* GROUP 5xx: RAIN */

            /* GROUP 3xx: DRIZZLE */ 
            case 300: // drizzle
            case 301:
            case 302:
            case 310:
            case 311:
            case 312:
            case 313:
            case 314:
            case 321:
                skycons_id = "RAIN"
                isItPrecip = true;
                isItSnow = false;
                return skycons.set(icon, Skycons[skycons_id]);
                break;
            /* GROUP 3xx: DRIZZLE */ 

            /* GROUP 2xx: THUNDERSTORM */
            case 200: // thunder with rain
            case 201:
            case 202:
                skycons_id = "THUNDER_RAIN"
                isItPrecip = true;
                isItSnow = false;
                return skycons.set(icon, Skycons[skycons_id]);
                break;
            
            case 210: // thunder 
            case 211:
            case 212:
            case 221:
                skycons_id = "THUNDER"
                isItPrecip = false;
                isItSnow = false;
                return skycons.set(icon, Skycons[skycons_id]);
                break;

            case 230: // thunder with rain Day
            case 231:
            case 232:
                skycons_id = "THUNDER_SHOWERS_DAY"
                isItPrecip = true;
                isItSnow = false;
                return skycons.set(icon, Skycons[skycons_id]);
                break;
            /* GROUP 2xx: THUNDERSTORM */
        }
    }

    else{ // NIGHT
        switch(iconID){
            /* CLEAR */
            case 800: // clear sky Night
                skycons_id = "CLEAR_NIGHT"
                isItPrecip = false;
                isItSnow = false;
                return skycons.set(icon, Skycons[skycons_id]);
                break;
            /* CLEAR */
            
            /* GROUP 80x: CLOUDS */
            case 801: // partly cloudy Night
            case 802:
                skycons_id = "PARTLY_CLOUDY_NIGHT"
                isItPrecip = false;
                isItSnow = false;
                return skycons.set(icon, Skycons[skycons_id]);

            case 803: // cloudy
            case 804:
                skycons_id = "CLOUDY"
                isItPrecip = false;
                isItSnow = false;
                return skycons.set(icon, Skycons[skycons_id]);
                break;
            /* GROUP 80x: CLOUDS */

            /* GROUP 7xx: ATMOSPHERE */
            case 701: // fog
            case 711:
            case 721:
            case 731:
            case 741:
            case 751:
            case 761:
            case 762:
            case 771:
            case 781:
                skycons_id = "FOG"
                isItPrecip = false;
                isItSnow = false;
                return skycons.set(icon, Skycons[skycons_id]);
                break;
            /* GROUP 7xx: ATMOSPHERE */

            /* GROUP 6xx: SNOW */
            case 600: // snow
            case 601:
            case 602:
                skycons_id = "SNOW"
                isItPrecip = true;
                isItSnow = true;
                return skycons.set(icon, Skycons[skycons_id]);
                break;

            case 611: // sleet
            case 612:
            case 613:
                skycons_id = "SLEET"
                isItPrecip = true;
                isItSnow = true;
                return skycons.set(icon, Skycons[skycons_id]);
                break;

            case 615: // rain snow
            case 511: // freezing rain
                skycons_id = "RAIN_SNOW"
                isItPrecip = true;
                isItSnow = true;
                return skycons.set(icon, Skycons[skycons_id]);
                break;

            case 616: // rain snow showers Night
                skycons_id = "RAIN_SNOW_SHOWERS_NIGHT"
                isItPrecip = true;
                isItSnow = true;
                return skycons.set(icon, Skycons[skycons_id]);
                break;

            case 620: // snow showers Night
            case 621:
            case 622:
                skycons_id = "SNOW_SHOWERS_NIGHT"
                isItPrecip = true;
                isItSnow = true;
                return skycons.set(icon, Skycons[skycons_id]);
                break;

            /* GROUP 6xx: SNOW */

            /* GROUP 5xx: RAIN */
            case 500: // rain
            case 501:
            case 502:
            case 503:
            case 504:
                skycons_id = "RAIN"
                isItPrecip = true;
                isItSnow = false;
                return skycons.set(icon, Skycons[skycons_id]);
                break;

            case 520: // rain showers Night
            case 521:
            case 522:
            case 531:
                skycons_id = "SHOWERS_NIGHT"
                isItPrecip = true;
                isItSnow = false;
                return skycons.set(icon, Skycons[skycons_id]);
                break;
            /* GROUP 5xx: RAIN */

            /* GROUP 3xx: DRIZZLE */ 
            case 300: // drizzle
            case 301:
            case 302:
            case 310:
            case 311:
            case 312:
            case 313:
            case 314:
            case 321:
                skycons_id = "RAIN"
                isItPrecip = true;
                isItSnow = false;
                return skycons.set(icon, Skycons[skycons_id]);
                break;
            /* GROUP 3xx: DRIZZLE */ 

            /* GROUP 2xx: THUNDERSTORM */
            case 200: // thunder with rain
            case 201:
            case 202:
                skycons_id = "THUNDER_RAIN"
                isItPrecip = true;
                isItSnow = false;
                return skycons.set(icon, Skycons[skycons_id]);
                break;
            
            case 210: // thunder 
            case 211:
            case 212:
            case 221:
                skycons_id = "THUNDER"
                isItPrecip = false;
                isItSnow = false;
                return skycons.set(icon, Skycons[skycons_id]);
                break;

            case 230: // thunder with rain Night
            case 231:
            case 232:
                skycons_id = "THUNDER_SHOWERS_NIGHT"
                isItPrecip = true;
                isItSnow = false;
                return skycons.set(icon, Skycons[skycons_id]);
                break;
            /* GROUP 2xx: THUNDERSTORM */

            default:
                alert('THE CODE PASSED DOES NOT EXIST');
                break;
        }
    }
} // END OF setIcons FUNCTION