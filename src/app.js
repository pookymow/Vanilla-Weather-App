//Geo location of heading
function showCurrentCity(responce) {
  console.log(responce.data.list[1].name);
  let h1CurrentCity = document.querySelector("#city");
  h1CurrentCity.innerHTML = `${responce.data.list[1].name}`;
}
//current Wx
function showWx(responce) {
  let forcast = document.querySelector("#forcast");
  let currentTemp = document.querySelector("#tempNow");
  let dayTemp = document.querySelector("#day");
  let nightTemp = document.querySelector("#night");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  forcast.innerHTML = responce.data.weather[0].description;
  currentTemp.innerHTML = Math.round(responce.data.main.temp);
  dayTemp.innerHTML = Math.round(responce.data.main.temp_max);
  nightTemp.innerHTML = Math.round(responce.data.main.temp_min);
  wind.innerHTML = Math.round(responce.data.wind.speed);
  humidity.innerHTML = Math.round(responce.data.main.humidity);
}

function showLocation(position) {
  console.log(position);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apikey = "11b98ae98b471e0d97626fd2fa0ca512";
  let apiFind = `https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
  let apiWx = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;

  axios.get(apiFind).then(showCurrentCity);
  axios.get(apiWx).then(showWx);
}

navigator.geolocation.getCurrentPosition(showLocation);

//
//
//button
function goHome() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let buttonSearch = document.querySelector("#button");
buttonSearch.addEventListener("click", goHome);
//search input to h1 City

function search(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input");
  let changeCity = document.querySelector("#city");
  let newCity = `${inputCity.value}`;
  if (inputCity.value) {
    changeCity.innerHTML = newCity;
    let apikey = "11b98ae98b471e0d97626fd2fa0ca512";
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apikey}&units=metric`;
    axios.get(api).then(showWx);
  }
}
let searchCity = document.querySelector("#city-form");
searchCity.addEventListener("submit", search);

//
//
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
