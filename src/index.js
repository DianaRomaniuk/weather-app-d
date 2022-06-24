// first - show current date and time
function formatDate(timestamp) {
  let date = new Date(timestamp);
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
  let dateCur = date.getDate(); //day of the month (current day)

  return ` ${day}, ${dateCur} ${month} ${year}, ${hour}:${minutes}`;
}

// Weather API

function showWeather(response) {
  console.log(response.data);
  let city = document.querySelector("#heading");
  city.innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;

  let currentTemp = document.querySelector("#today-temperature");
  currentTemp.innerHTML = Math.round(celsiusTemperature);

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let tempFeels = document.querySelector("#tempFeels");
  tempFeels.innerHTML = Math.round(response.data.main.feels_like);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);

  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#today-weather-item-day-hour");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "882b5be45f109746cefd754c31cdf40b";
  let unitMetric = "units=metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?`;
  let cityURL = `${url}q=${city}&${unitMetric}&appid=${apiKey}`;

  if (city !== "") {
    axios.get(cityURL).then(showWeather);
  } else {
    alert("Enter another name of city");
  }
}

function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#form-input");
  search(inputCity.value);
}

let form = document.querySelector("#formaa");
form.addEventListener("submit", handleSubmit);

// Current Location button that uses the Geolocation API

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "882b5be45f109746cefd754c31cdf40b";
  let url = `https://api.openweathermap.org/data/2.5/weather?`;
  let unitMetric = "units=metric";
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

// Celsius to F

function toFar(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let temperatureElement = document.querySelector("#today-temperature");
  let fahrenheitTemperature = celsiusTemperature * 1.8 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function toC(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#today-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
console.log(celsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", toFar);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", toC);

search("Kyiv");
