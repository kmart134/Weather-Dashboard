//Declare Variables
var searchHistory= [];
var openWeatherUrl = 'https://api.openweathermap.org';
var apiKey = '5fac388ef92055f2e3608e994607821c';

//html Element references
var searchForm = document.querySelector("#search-form");
var searchText = document.querySelector("#search-input");
var today = document.querySelector("#today");
var forecastContainer = document.querySelector("#forecast");
var history = document.querySelector("#history");
var button = document.querySelector("#search-button");
var name;




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

      document.querySelector(".city").innerText= "Weather in"+ name;
 
      
    fetchWeather(lat, lon); 
  
      
})
   
}


//get data for the weather in location searched
function fetchWeather(lat,lon){
    

    var weatherURL= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`

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
      //double check if icon shows up
      var icon = data.weather[0].icon;
      console.log(icon);


      //render content on the page
      renderWeather();
      
      document.querySelector(".icon").src= "https://openweathermap.org/img/wn/"+icon+ "@2x.png";
      document.querySelector(".temp").innerText=temperature +"°F";
      document.querySelector(".humidity").innerText= "Humidity: "+humidity+"%";
      document.querySelector(".wind").innerText= "Wind Speed: "+ windSpeed + "mph"; 

    })

}


function renderWeather (data){
}

//five day forecast
//History Feature .. use local storage

button.addEventListener('click', searchHandle);