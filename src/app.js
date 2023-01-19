//Day
function showDay() {
  let today = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentday = days[today.getDay()];
  return currentday;
}

let dayToday = document.querySelector("#day-today");
dayToday.innerHTML = showDay();
//
//
//Time
function showTime() {
  let today = new Date();
  let hour = today.getHours();
  let mins = today.getMinutes();
  let currenttime = `${hour}:${mins}`;
  return currenttime;
}
let timeNow = document.querySelector("#time-now");
timeNow.innerHTML = showTime();
//
//
//Date
function showDate() {
  let today = new Date();

  let day = today.getDate();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let currentdate = `${day}/${month}/${year}`;
  return currentdate;
}

let dateToday = document.querySelector("#date-today");
dateToday.innerHTML = showDate();

//Geo location of heading
function showCurrentCity(responce) {
  let h1CurrentCity = document.querySelector("#city");
  h1CurrentCity.innerHTML = `${responce.data.city}`;
}
//current Wx
function showWx(responce) {
  let forcast = document.querySelector("#forcast");
  forcast.innerHTML = responce.data.daily[0].condition.description;
  let currentTemp = document.querySelector("#tempNow");
  currentTemp.innerHTML = Math.round(responce.data.daily[0].temperature.day);

  let dayTemp = document.querySelector("#day");
  dayTemp.innerHTML = `${Math.round(
    responce.data.daily[0].temperature.maximum
  )}℃`;

  let nightTemp = document.querySelector("#night");
  nightTemp.innerHTML = `${Math.round(
    responce.data.daily[0].temperature.minimum
  )}℃`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(responce.data.daily[0].wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(responce.data.daily[0].temperature.humidity);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${responce.data.daily[0].condition.icon}.png`
  );
}
//
//
//forecast
function formateForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function fiveDay(responce) {
  console.log(responce.data);
  console.log(responce.data.daily[0].temperature.day);

  let forecastEl = document.querySelector("#forecast");
  let wxForecast = responce.data.daily;
  let forecastHTML = `<div class="row">`;

  wxForecast.forEach(function (forecastday, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <div class="view">
                <div class="wx-forecast-day">
                ${formateForecastDay(forecastday.time)}
                </div>
                <div class="emoji-forecast">
                <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                  forecastday.condition.icon
                }.png" class="imgEmoji">
                  
                </div>
                <div class="tempVeiw">
                <span class="forecast-max" >${Math.round(
                  forecastday.temperature.maximum
                )}℃</span> 
                <span class="forecast-min">${Math.round(
                  forecastday.temperature.minimum
                )}℃</span>
                </div>
                </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastEl.innerHTML = forecastHTML;
}

//lat log
function showLocation(position) {
  let latitude = position.coords.latitude;
  console.log(latitude);
  let longitude = position.coords.longitude;
  console.log(longitude);
  let apiForecast = `https://api.shecodes.io/weather/v1/forecast?lat=${latitude}&lon=${longitude}&key=dcdbob4f1ac005349aea9810b37ft2d4&units=metric`;
  console.log(apiForecast);
  axios.get(apiForecast).then(showCurrentCity);
  axios.get(apiForecast).then(showWx);
  axios.get(apiForecast).then(fiveDay);
}

navigator.geolocation.getCurrentPosition(showLocation);
//button
function goHome() {
  navigator.geolocation.getCurrentPosition(showLocation);
  let reload = document.querySelector("#city-input");
  reload.value = ``;
}

let buttonSearch = document.querySelector("#button");
buttonSearch.addEventListener("click", goHome);

//search input to h1 City
function search(event) {
  event.preventDefault();
  let inputCity = document.getElementById("city-input");
  let changeCity = document.querySelector("#city");
  let newCity = `${inputCity.value}`;
  if (inputCity.value) {
    changeCity.innerHTML = newCity;
    let api = `https://api.shecodes.io/weather/v1/forecast?query=${newCity}&key=dcdbob4f1ac005349aea9810b37ft2d4&units=metric`;
    console.log(api);
    axios.get(api).then(showWx);
    axios.get(api).then(fiveDay);
  }
}
let searchCity = document.querySelector("#city-form");
searchCity.addEventListener("submit", search);

//C/F
function showCel() {
  let celTemp = document.querySelector("#tempNow");
  celTemp.innerHTML = Math.round(orginalTemp);
  toFer.classList.remove("active");
  toCel.classList.add("active");
  let dayC = document.querySelector("#day");
  dayC.innerHTML = `${Math.round(orginalDay)}℃`;
  let nytC = document.querySelector("#night");
  nytC.innerHTML = `${Math.round(orginalNyt)}℃`;
}
function showFer() {
  let temprature = document.querySelector("#tempNow");
  let ferTemp = (orginalTemp * 9) / 5 + 32;
  temprature.innerHTML = Math.round(ferTemp);
  toCel.classList.remove("active");
  toFer.classList.add("active");
  let day = document.querySelector("#day");
  let dayF = (orginalDay * 9) / 5 + 32;
  day.innerHTML = `${Math.round(dayF)}℉`;
  let nyt = document.querySelector("#night");
  let nytF = (orginalNyt * 9) / 5 + 32;
  nyt.innerHTML = `${Math.round(nytF)}℉`;
}
let orginalTemp = null;
let orginalDay = null;
let orginalNyt = null;

let toCel = document.querySelector("#cel");
toCel.addEventListener("click", showCel);

let toFer = document.querySelector("#fer");
toFer.addEventListener("click", showFer);
