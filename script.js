window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let area = document.querySelector('.location-area');
    let clothing = document.querySelector('.clothing-description');
    let isItPrecip;
    let isItSnow;
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
                var location_area = data['name']; // contains the location 

                var temp = data['main']['temp']; // contains the temperature in kelvin
                var new_temp = toFarenheit(temp); // convert the temperature to Farenheit
                new_temp = new_temp.toPrecision(2); 

                var feels_like_temp = data['main']['feels_like']; // Get the feels like temperature 
                feels_like_temp = toFarenheit(feels_like_temp); // convert the feels like to Farenheit
                feels_like_temp = feels_like_temp.toPrecision(2);

                var desc = data['weather'][0]['description']; // Get the description of the weather 

                var icon_ID = data['weather'][0]['id']; // this will hold the icon
                console.log(icon_ID);

                area.innerHTML = location_area;
                temperatureDegree.innerHTML = new_temp;
                temperatureDescription.innerHTML = desc;

                setIcons(icon_ID, document.querySelector('.icon'));
                whatToWear(feels_like_temp);

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

    function whatToWear(feels_like_temp){
        if(feels_like_temp > 75 && isItPrecip == true){
            clothing.innerHTML = "It's a warm day for some rain, make sure you bring an umbrella!";
        }
        else if(feels_like_temp > 75 && isItPrecip == false){
            clothing.innerHTML = "It's shorts and shirt weather baby!";
        }
        else if(feels_like_temp > 65 && isItPrecip == true){
            clothing.innerHTML = "Make sure you bring an umbrella you bozo!";
        }
        else if(feels_like_temp > 65 && isItPrecip == false){
            clothing.innerHTML = "Soak up today because it is a beauty right now!";
        }
        else if(feels_like_temp > 55 && isItPrecip == true){
            clothing.innerHTML = "Wear a jacket and bring an umbrella!";
        }
        else if(feels_like_temp > 55 && isItPrecip == false){
            clothing.innerHTML = "It's a little chilly, wear a light jacket and some long pants!";
        }
        else if(feels_like_temp > 45 && isItPrecip == true){
            clothing.innerHTML = "Bundle up and bring an umbrella!";
        }
        else if(feels_like_temp > 45 && isItPrecip == false){
            clothing.innerHTML = "Bundle up, it's getting cold!";
        }
        else if(feels_like_temp > 35 && isItPrecip == true && isItSnow == true){
            clothing.innerHTML = "Wear a hat, scarf, jacket, and the whole nine, it's snowing!";
        }
        else if(feels_like_temp > 35 && isItPrecip == true && isItSnow == false){
            clothing.innerHTML = "It's a cold day to bust out the umbrella, stay warm out there!";
        }
        else if(feels_like_temp > 35 && isItPrecip == false){
            clothing.innerHTML = "Please stay warm, you don't want to catch a cold!";
        }
        else if(feels_like_temp < 36 && isItPrecip == true && isItSnow == true){
            clothing.innerHTML = "Brrrr! Stay inside, it's a mess out there!";
        }
        else if(feels_like_temp < 36 && isItPrecip == true && isItSnow == false){
            clothing.innerHTML = "It is freezing, make sure that umbrella is working!";
        }
        else if(feels_like_temp < 36 && isItPrecip == false){
            clothing.innerHTML = "It is freezing out there, wear layers if you have to!";
        }
        else
            clothing.innerHTML = "";
    }

    /*
    function whatToWear(iconID, temp){
        while(temp > 71){
            switch(iconID){
                case 800: // GENERALLY SUNNY
                case 801:
                case 802:
                case 803:
                case 804:
                case 701:
                case 711:
                case 721:
                case 731:
                case 741:
                case 751:
                case 761:
                case 771:
                case 781:
                    clothing.innerHTML = "It's shorts and shirt weather baby!";
                    break;
                
                case 611: // SLEET
                case 612:
                case 613:
                    clothing.innerHTML = "It's a muggy day for some sleet, make sure you bring an umbrella!";
                    break;

                case 615: // RAIN
                case 511:
                case 616:
                case 620:
                case 621:
                case 622:
                case 500:
                case 501:
                case 502:
                case 503:
                case 504:
                case 520:
                case 521:
                case 522:
                case 531:
                case 300:
                case 301:
                case 302:
                case 310:
                case 311:
                case 312:
                case 313:
                case 314:
                case 321:
                    clothing.innerHTML = "It's a muggy day for some rain, make sure you bring an umbrella!";
                    break;
                
                case 200: // THUNDER W/RAIN
                case 201:
                case 202:
                case 230: 
                case 231:
                case 232:
                    clothing.innerHTML = "Rain AND thunder?! Bring an umbrella and be careful!";
                    break;
                    
                case 210: // THUNDER 
                case 211:
                case 212:
                case 221:
                    clothing.innerHTML = "Beware of thunder and bring an umbrella just in case!";
                    break;
                
                default:
                    alert('ERROR');
                    break;
            }
        } // end of >75 while

        while(temp > 59 && temp < 72){
            switch(iconID){
                case 800: // GENERALLY SUNNY
                case 801:
                case 802:
                case 803:
                case 804:
                case 701:
                case 711:
                case 721:
                case 731:
                case 741:
                case 751:
                case 761:
                case 771:
                case 781:
                    clothing.innerHTML = "It's light jacket and long pants weather baby!";
                    break;

                case 611: // SLEET
                case 612:
                case 613:
                    clothing.innerHTML = "There's some precipitation so you better bring an umbrella!";
                    break;

                case 615: // RAIN
                case 511:
                case 616:
                case 620:
                case 621:
                case 622:
                case 500:
                case 501:
                case 502:
                case 503:
                case 504:
                case 520:
                case 521:
                case 522:
                case 531:
                case 300:
                case 301:
                case 302:
                case 310:
                case 311:
                case 312:
                case 313:
                case 314:
                case 321:
                    clothing.innerHTML = "It's a nippy day for some rain, dress warm and bring an umbrella!";
                    break;

                case 200: // THUNDER W/RAIN
                case 201:
                case 202:
                case 230: 
                case 231:
                case 232:
                    clothing.innerHTML = "Rain AND thunder?! Dress warm and bring an umbrella!";
                    break;

                case 210: // THUNDER 
                case 211:
                case 212:
                case 221:
                    clothing.innerHTML = "It's a bit chilly and there's some thunder. Beware!";
                    break;
                
                default:
                    alert('ERROR');
                    break;
            }
        } // end of temp > 59 && temp < 72 while

        while(temp > 49 && temp < 60){
            switch(iconID){
                case 800: // GENERALLY SUNNY
                case 801:
                case 802:
                case 803:
                case 804:
                case 701:
                case 711:
                case 721:
                case 731:
                case 741:
                case 751:
                case 761:
                case 771:
                case 781:
                    clothing.innerHTML = "Make sure you wear a jacket with some warm pants!";
                    break;

                case 611: // SLEET
                case 612:
                case 613:
                    clothing.innerHTML = "There's some precipitation and it's cold! Better bring an umbrella!";
                    break;

                case 615: // RAIN
                case 511:
                case 616:
                case 620:
                case 621:
                case 622:
                case 500:
                case 501:
                case 502:
                case 503:
                case 504:
                case 520:
                case 521:
                case 522:
                case 531:
                case 300:
                case 301:
                case 302:
                case 310:
                case 311:
                case 312:
                case 313:
                case 314:
                case 321:
                    clothing.innerHTML = "It's a cold day for some rain, dress very warm and bring an umbrella!";
                    break;

                case 200: // THUNDER W/RAIN
                case 201:
                case 202:
                case 230: 
                case 231:
                case 232:
                    clothing.innerHTML = "Rain AND thunder?! Dress very warm and bring an umbrella!";
                    break;

                case 210: // THUNDER 
                case 211:
                case 212:
                case 221:
                    clothing.innerHTML = "It's cold and there's some thunder. Beware!";
                    break;

                case 600: // SNOW
                case 601:
                case 602:
                case 615: 
                case 511: 
                case 616: 
                case 620: 
                case 621:
                case 622:
                    clothing.innerHTML = "Wear a hat, a scarf, a pair of mittens, and the whole nine, it's snowing baby!";

                default:
                    alert('ERROR');
                    break;
            }
        } // end of temp > 49 && temp < 60 while

        while(temp > 34 && temp < 50){
            switch(iconID){
                case 800: // GENERALLY SUNNY
                case 801:
                case 802:
                case 803:
                case 804:
                case 701:
                case 711:
                case 721:
                case 731:
                case 741:
                case 751:
                case 761:
                case 771:
                case 781:
                    clothing.innerHTML = "It's cold. Please dress like it is.";
                    break;

                case 611: // SLEET
                case 612:
                case 613:
                    clothing.innerHTML = "No one likes sleet. Bring an umbrella and dress warm.";
                    break;

                case 615: // RAIN
                case 511:
                case 616:
                case 620:
                case 621:
                case 622:
                case 500:
                case 501:
                case 502:
                case 503:
                case 504:
                case 520:
                case 521:
                case 522:
                case 531:
                case 300:
                case 301:
                case 302:
                case 310:
                case 311:
                case 312:
                case 313:
                case 314:
                case 321:
                    clothing.innerHTML = "It's a very cold day for some rain, dress very warm and bring an umbrella!";
                    break;

                case 200: // THUNDER W/RAIN
                case 201:
                case 202:
                case 230: 
                case 231:
                case 232:
                    clothing.innerHTML = "Rain AND thunder?! Dress very warm and bring an umbrella!";
                    break;

                case 210: // THUNDER 
                case 211:
                case 212:
                case 221:
                    clothing.innerHTML = "It's cold and there's some thunder. Beware!";
                    break;

                case 600: // SNOW
                case 601:
                case 602:
                case 615: 
                case 511: 
                case 616: 
                case 620: 
                case 621:
                case 622:
                    clothing.innerHTML = "Wear a hat, a scarf, a pair of mittens, and the whole nine, it's snowing baby!";

                default:
                    alert('ERROR');
                    break;
            }
        } // end of temp > 34 && temp < 50 while

        while(temp < 35){
            switch(iconID){
                case 800: // GENERALLY SUNNY
                case 801:
                case 802:
                case 803:
                case 804:
                case 701:
                case 711:
                case 721:
                case 731:
                case 741:
                case 751:
                case 761:
                case 771:
                case 781:
                    clothing.innerHTML = "It's freezing. Listen to your mother or else you will catch a cold.";
                    break;

                case 611: // SLEET
                case 612:
                case 613:
                    clothing.innerHTML = "No one likes sleet and it's freezing. Bring an umbrella and dress very warm.";
                    break;

                case 615: // RAIN
                case 511:
                case 616:
                case 620:
                case 621:
                case 622:
                case 500:
                case 501:
                case 502:
                case 503:
                case 504:
                case 520:
                case 521:
                case 522:
                case 531:
                case 300:
                case 301:
                case 302:
                case 310:
                case 311:
                case 312:
                case 313:
                case 314:
                case 321:
                    clothing.innerHTML = "It's freezing and there's rain. Dress very warm and bring an umbrella!";
                    break;

                case 200: // THUNDER W/RAIN
                case 201:
                case 202:
                case 230: 
                case 231:
                case 232:
                    clothing.innerHTML = "Rain AND thunder?! Dress very warm and bring an umbrella!";
                    break;

                case 210: // THUNDER 
                case 211:
                case 212:
                case 221:
                    clothing.innerHTML = "It's freezing and there's some thunder. Beware!";
                    break;

                case 600: // SNOW
                case 601:
                case 602:
                case 615: 
                case 511: 
                case 616: 
                case 620: 
                case 621:
                case 622:
                    clothing.innerHTML = "It is freezing. Your face will be numb if you go outside.";

                default:
                    alert('ERROR');
                    break;
            }
        }
    } // end of whatToWear
    */
    
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
});
