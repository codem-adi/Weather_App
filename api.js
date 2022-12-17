console.log("file call")

loader = document.getElementById("loader");
card_image = document.getElementsByClassName("card_image");
card = document.getElementsByClassName("details");
submit = document.getElementById("submit")
city_temp = document.getElementById("city_temp");
city_name_heading = document.getElementById("city_name_heading");
detail_temp = document.getElementById("detail_temp");
detail_maxTemp = document.getElementById("detail_maxTemp");
detail_minTemp = document.getElementById("detail_minTemp");
detail_humidity = document.getElementById("detail_humidity");
detail_sunRise = document.getElementById("detail_sunRise");
detail_sunSet = document.getElementById("detail_sunSet");
function get_temp(cityName) {
     document.querySelector("body > main > div > div.details").style.opacity = .2
     loader.style.opacity = 1;
     const options = {
          method: 'GET',
          headers: {
               'X-RapidAPI-Key': 'b170702fa8mshee3ef2d61df85a0p134664jsn39d743fb4687',
               'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
          }
     };
     let status_code;
     fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${cityName}`, options)
          .then(response_data => {
               status_code = response_data.status;
               return response_data.json()
          }
          )
          .then(response => {
               if (status_code == 200) {
                    console.log(response);
                    var sunrise = new Date(response.sunrise * 1000);
                    var sunset = new Date(response.sunset * 1000);
                    let sunset_hrs = sunset.getHours();
                    let sunrise_hrs = sunset.getHours();

                    //converting the time to noraml 12 hrs time
                    if (sunset_hrs > 12) {
                         sunset_hrs = sunset_hrs - 12;
                         console.log(sunset_hrs);
                    }
                    if (sunrise_hrs > 12) {
                         sunrise_hrs = sunrise_hrs - 12;
                         console.log(sunrise_hrs);
                    }


                    //changing the image as per the temperature
                    if (response.temp > 35) {
                         card_image[0].style.backgroundImage = "url('summar.jpg')";
                    }
                    else if (response.temp <= 35 && response.temp > 15) {
                         card_image[0].style.backgroundImage = "url('normal.png')";
                    }
                    else {
                         card_image[0].style.backgroundImage = "url('cold.jpg')";
                    }

                    // city_name_heading.innerHTML = response.temp;
                    detail_temp.innerHTML = response.temp;
                    detail_maxTemp.innerHTML = response.max_temp
                    detail_minTemp.innerHTML = response.min_temp
                    detail_humidity.innerHTML = response.humidity
                    detail_sunRise.innerHTML = ("0" + sunrise_hrs).substr(-2) + ":" + ("0" + sunrise.getMinutes()).substr(-2);
                    //response.sunrise
                    detail_sunSet.innerHTML = ("0" + sunset_hrs).substr(-2) + ":" + ("0" + sunset.getMinutes()).substr(-2);
               }
               else {
                    city_name_heading.innerHTML = "City not found";
                    detail_temp.innerHTML = "00"
                    detail_maxTemp.innerHTML = "00"
                    detail_minTemp.innerHTML = "00"
                    detail_humidity.innerHTML = "00"
                    detail_sunRise.innerHTML = "00"
                    detail_sunSet.innerHTML = "00"
               }
               document.querySelector("body > main > div > div.details").style.opacity = 1;
               loader.style.opacity = 0;
          })
          .catch(err => console.error(err));
}
get_temp("mumbai")
submit.addEventListener("click", async (e) => {
     e.preventDefault();
     get_temp(city_temp.value);
     console.log("fetched", city_temp.value)
     city_name_heading.innerHTML = city_temp.value;

}
)

