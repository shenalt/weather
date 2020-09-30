window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let area = document.querySelector('.location-area');
    let iconGraphic = document.querySelector('.icon');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=dac6204ad1e6aa80dd131c7aa83cbc38`;

            fetch(api)
            .then(response => { // After you got the info, we can do something w/this data
                return response.json();
            }) 
            .then(data => {
                console.log(data);
                var location_area = data['name'];
                var temp = data['main']['temp'];
                var new_temp = toFarenheit(temp);
                new_temp = new_temp.toPrecision(2);
                var desc = data['weather'][0]['description'];
                var icon_ID = data['weather'][0]['id'] // this will hold the icon
                console.log(icon_ID);

                area.innerHTML = location_area;
                temperatureDegree.innerHTML = new_temp;
                temperatureDescription.innerHTML = desc;
                setIcons(icon_ID, document.querySelector('.icon'));

                /* can go with either above or below
                //temperatureDescription.textContent = desc;
                //temperatureDegree.textContent = temp;
                //area.textContent = location_area;
                */
            });
        });
    }

    function toFarenheit(temp){
        let x = (temp - 273.15) * (9/5) + 32;
        return x;
    }
    
    function setIcons(iconID, icon){
        // icon is going to contain the doc query selector for the canvas icon class
        // iconID is going to contain the id sent from OpenWeatherMap
        const skycons = new Skycons({color: "pink "});
        let now = new Date();
        let hour = now.getHours();
        let skycons_id;
        skycons.play();

        if(hour < 19 && hour >=7){ // MORNING
            switch(iconID){
                /* GROUP 800: CLEAR */
                case 800: // clear sky Day
                    skycons_id = "CLEAR_DAY"
                    return skycons.set(icon, Skycons[skycons_id]);
                    break;
                /* GROUP 800: CLEAR */

                /* GROUP 80x: CLOUDS */
                case 801: // partly cloudy Day 
                case 802:
                    skycons_id = "PARTLY_CLOUDY_DAY"
                    return skycons.set(icon, Skycons[skycons_id]);
                    break;

                case 803: // cloudy
                case 804:
                    skycons_id = "CLOUDY"
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
                    return skycons.set(icon, Skycons[skycons_id]);
                    break;
                /* GROUP 7xx: ATMOSPHERE */

                /* GROUP 6xx: SNOW */
                case 600: // snow
                case 601:
                case 602:
                    skycons_id = "SNOW"
                    return skycons.set(icon, Skycons[skycons_id]);
                    break;

                case 611: // sleet
                case 612:
                case 613:
                    skycons_id = "SLEET"
                    return skycons.set(icon, Skycons[skycons_id]);
                    break;

                case 615: // rain snow
                case 511: // freezing rain
                    skycons_id = "RAIN_SNOW"
                    return skycons.set(icon, Skycons[skycons_id]);
                    break;

                case 616: // rain snow showers Day
                    skycons_id = "RAIN_SNOW_SHOWERS_DAY"
                    return skycons.set(icon, Skycons[skycons_id]);
                    break;

                case 620: // snow showers Day
                case 621:
                case 622:
                    skycons_id = "SNOW_SHOWERS_DAY"
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
                    return skycons.set(icon, Skycons[skycons_id]);
                    break;
                
                case 520: // rain showers Day
                case 521:
                case 522:
                case 531:
                    skycons_id = "SHOWERS_DAY"
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
                    return skycons.set(icon, Skycons[skycons_id]);
                    break;
                /* GROUP 3xx: DRIZZLE */ 

                /* GROUP 2xx: THUNDERSTORM */
                case 200: // thunder with rain
                case 201:
                case 202:
                    skycons_id = "THUNDER_RAIN"
                    return skycons.set(icon, Skycons[skycons_id]);
                    break;
                
                case 210: // thunder 
                case 211:
                case 212:
                case 221:
                    skycons_id = "THUNDER"
                    return skycons.set(icon, Skycons[skycons_id]);
                    break;

                case 230: // thunder with rain Day
                case 231:
                case 232:
                    skycons_id = "THUNDER_SHOWERS_DAY"
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
                    return skycons.set(icon, Skycons[skycons_id]);
                    break;
                /* CLEAR */
                
                /* GROUP 80x: CLOUDS */
                case 801: // partly cloudy Night
                case 802:
                    skycons_id = "PARTLY_CLOUDY_NIGHT"
                    return skycons.set(icon, Skycons[skycons_id]);

                case 803: // cloudy
                case 804:
                    skycons_id = "CLOUDY"
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
                    return skycons.set(icon, Skycons[skycons_id]);
                    break;
                /* GROUP 7xx: ATMOSPHERE */

                /* GROUP 6xx: SNOW */
                case 600: // snow
                case 601:
                case 602:
                    skycons_id = "SNOW"
                    return skycons.set(icon, Skycons[skycons_id]);
                    break;

                case 611: // sleet
                case 612:
                case 613:
                    skycons_id = "SLEET"
                    return skycons.set(icon, Skycons[skycons_id]);
                    break;

                case 615: // rain snow
                case 511: // freezing rain
                    skycons_id = "RAIN_SNOW"
                    return skycons.set(icon, Skycons[skycons_id]);
                    break;

                case 616: // rain snow showers Night
                    skycons_id = "RAIN_SNOW_SHOWERS_NIGHT"
                    return skycons.set(icon, Skycons[skycons_id]);
                    break;

                case 620: // snow showers Night
                case 621:
                case 622:
                    skycons_id = "SNOW_SHOWERS_NIGHT"
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
                    return skycons.set(icon, Skycons[skycons_id]);
                    break;

                case 520: // rain showers Night
                case 521:
                case 522:
                case 531:
                    skycons_id = "SHOWERS_NIGHT"
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
                    return skycons.set(icon, Skycons[skycons_id]);
                    break;
                /* GROUP 3xx: DRIZZLE */ 

                /* GROUP 2xx: THUNDERSTORM */
                case 200: // thunder with rain
                case 201:
                case 202:
                    skycons_id = "THUNDER_RAIN"
                    return skycons.set(icon, Skycons[skycons_id]);
                    break;
                
                case 210: // thunder 
                case 211:
                case 212:
                case 221:
                    skycons_id = "THUNDER"
                    return skycons.set(icon, Skycons[skycons_id]);
                    break;

                case 230: // thunder with rain Night
                case 231:
                case 232:
                    skycons_id = "THUNDER_SHOWERS_NIGHT"
                    return skycons.set(icon, Skycons[skycons_id]);
                    break;
                /* GROUP 2xx: THUNDERSTORM */

                default:
                    alert('THE CODE PASSED DOES NOT EXIST');
                    break;
            }
        }
    } // END OF setIcons FUNCTION
});
