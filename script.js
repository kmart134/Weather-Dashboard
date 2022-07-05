//SEARCH
var searchHistory= [];
var openWeatherUrl = 'https://api.openweathermap.org';
// var apiKey = '5fac388ef92055f2e3608e994607821c';

//html Element references
var searchForm = document.querySelector("#search-form");
var searchText = document.querySelector("#search-input");
var today = document.querySelector("#today");
var forecastContainer = document.querySelector("#forecast");
var history = document.querySelector("#history");

//grabbing the values from the search, to later use in functions

function searchHandle (){
    //grab the search content
    // fetchLocation(data we received from search)
}
//FUNCTIONALITY for fethcing location--activity 3 in unit 6
//call the location API

function fetchLocation (search){
    //get data pertaining to location- using an API call
    //fetchWeather()

}

//FUNCTIONALITY for  fetching weather

function fetchWeather(location){
//get data for the weather in location we searched using an API call

}

//FUNCTIONALITY for rendering content on the page
function renderWeather (data){
    //append information
}

//History Feature .. use local storage
