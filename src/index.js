let now = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentTime = `${now.getHours()}:${now.getMinutes()}`;
  let formattedDate = `${currentDay}, ${currentTime}`;

  return formattedDate;
}

let currentTimeAndDate = document.querySelector("#currentDate");
currentTimeAndDate.innerHTML = formatDate(now);

//Search

// nead search to show weather and change header.

//

function displayWeather(response) {
  let currentCityHeader = document.querySelector("#currentCityHeader");
  currentCityHeader.innerHTML = response.data.name;
  let degrees = document.querySelector("#currentTemp");
  degrees.innerHTML = `${Math.round(response.data.main.temp)}`;
  document.querySelector("#precipitation").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function updateCity(event) {
  let city = document.querySelector("#cityInput").value;

  let apiKey = "c8bcf38f16acb69ddfc1b3daa6ad1ae3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;
  updateCity(city);
}

function searchLocation(position) {
  let apiKey = "c8bcf38f16acb69ddfc1b3daa6ad1ae3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let cityForm = document.querySelector("#cityForm");
cityForm.addEventListener("submit", submit);

let button = document.querySelector("#currentLocation");
button.addEventListener("click", showLocation);
