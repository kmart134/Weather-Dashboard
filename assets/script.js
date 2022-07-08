//Declare Variables
var searchHistory= [];
var openWeatherUrl = 'https://api.openweathermap.org';
var apiKey = '5fac388ef92055f2e3608e994607821c';
var NowMoment = moment();

//html Element references
var searchForm = document.querySelector("#search-form");
var searchText = document.querySelector("#search-input");
var today = document.querySelector("#today");
var forecastContainer = document.querySelector("#forecast");
var history = document.querySelector("#history");
var button = document.querySelector("#search-button");
var name;


today.innerHTML = NowMoment.format('dddd')+"   " + NowMoment.format('MMM Do YY');

//grab the values from the search, to later use in functions
var searchHandle = function(event){
    event.preventDefault();
var search= searchText.value.trim()
   console.log(search);
   console.log("working");

   fetchLocation(search);
    // fetchLocation(data we received from search)
}



//use API to render Latitude and Longitude of uder input city

function fetchLocation (search){
  
    var locationURL= ("http://api.openweathermap.org/geo/1.0/direct?q="+ search + "&limit=1&appid="+apiKey)
    

    fetch(locationURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)

      var lat = data[0].lat;
      console.log (lat);
      var lon = data[0].lon;
      console.log (lon);
      var name = data[0].name;
      console.log (name);

      document.querySelector(".city").innerText= "Weather in "+ name;
 
      
    fetchWeather(lat, lon); 
  
      
})
   
}

//get data for the weather in location searched
function fetchWeather(lat,lon){
    

    var weatherURL=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`

    fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)

      var temperature = data.main.temp;
      console.log(temperature);
      var humidity = data.main.humidity;
      console.log(humidity);
      var windSpeed = data.wind.speed;
      console.log(windSpeed);
      var icon = data.weather[0].icon;
      console.log(icon);


    //render content on the page
      document.querySelector(".icon").src= "https://openweathermap.org/img/wn/"+icon+ "@2x.png";
      document.querySelector(".temp").innerText=temperature +"°F";
      document.querySelector(".humidity").innerText= "Humidity: "+humidity+"%";
      document.querySelector(".wind").innerText= "Wind Speed: "+ windSpeed + "mph"; 

      renderForecast(lat, lon);
    })

}


//five day forecast
function renderForecast(lat, lon){

 var forecastURL= `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=imperial`

 fetch(forecastURL)
 .then(function (response) {
   return response.json();
 })
 .then(function (data) {
   console.log(data)
   


  for (var k = 0; k < 5; k++) {
    //Time of the forecasted data, Unix, UTC
    const { dt } = data.daily[k];
    
    const { day } = data.daily[k].temp;
    document.getElementById("temp" + [k]).innerText = "Temperature: " + day + " °F";
    console.log(k);

    const { wind_speed } = data.daily[k];
    document.getElementById("wind" + [k]).innerText = "Wind Speed: " + wind_speed + " mph";

    const { humidity } = data.daily[k];
    document.getElementById("humidity" + [k]).innerText = "Humidity: " + humidity + "%";

    const { icon } = data.daily[k].weather[0];
    document.getElementById("icon" + [k]).src= "https://openweathermap.org/img/wn/"+icon+ "@2x.png";

    console.log(dt,day,wind_speed,humidity,icon)
    

  }
})

}

//History Feature .. use local storage

button.addEventListener('click', searchHandle);