//SEARCH
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




//grab the values from the search, to later use in functions
var searchHandle = function(event){
    event.preventDefault();
var search= searchText.value.trim()
   console.log(search);
   console.log("working");

   fetchLocation(search);
    // fetchLocation(data we received from search)
}



//FUNCTIONALITY for fethcing location
//call the location API

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

 
      
    fetchWeather(lat, lon); 
  
      
})
    //get data pertaining to location- using an API call
}

//FUNCTIONALITY for  fetching weather

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
    })

//get data for the weather in location we searched using an API call

}

//FUNCTIONALITY for rendering content on the page
function renderWeather (data){
    //append information
}

//History Feature .. use local storage

button.addEventListener('click', searchHandle);