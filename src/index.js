// first - show current date and time
function formatDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  // minutes
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  // day
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  // month
  let monthIndex = date.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[monthIndex];
  //  year
  let year = date.getFullYear();

  // day
  let dateC = date.getDate(); //day of the month (current day)

  return ` ${day}, ${dateC} ${month} ${year}, ${hour}:${minutes}`;
}

let currentTime = new Date();

let dateToday = document.querySelector("#today-weather-item-day-hour");
dateToday.innerHTML = formatDate(currentTime);

// Weather API

let apiKey = "882b5be45f109746cefd754c31cdf40b";
let unitMetric = "units=metric";
let url = `https://api.openweathermap.org/data/2.5/weather?`;

function showWeather(response) {
  console.log(response.data);
  let city = document.querySelector("#heading");
  city.innerHTML = response.data.name;

  let currentTemp = document.querySelector("#today-temperature");
  currentTemp.innerHTML = Math.round(response.data.main.temp);

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let tempFeels = document.querySelector("#tempFeels");
  tempFeels.innerHTML = Math.round(response.data.main.feels_like);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);

  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}

function showCityWeather(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#form-input");
  let cityURL = `${url}q=${inputCity.value}&${unitMetric}&appid=${apiKey}`;

  //  if (inputCity.value.length !== 0) {

  if (inputCity.value !== "") {
    axios.get(cityURL).then(showWeather);
  } else {
    alert("Enter another name of city");
  }
}

let form = document.querySelector("#formaa");
form.addEventListener("submit", showCityWeather);

// Current Location button that uses the Geolocation API

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  // let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&${unitMetric}`;
  let apiURL = `${url}lat=${lat}&lon=${lon}&appid=${apiKey}&${unitMetric}`;
  axios.get(apiURL).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCityBtn = document.querySelector("#current-btn");
currentCityBtn.addEventListener("click", getCurrentPosition);
