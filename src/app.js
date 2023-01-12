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
  console.log(responce.data.list[1].name);
  let h1CurrentCity = document.querySelector("#city");
  h1CurrentCity.innerHTML = `${responce.data.list[1].name}`;
}
//current Wx
function showWx(responce) {
  let forcast = document.querySelector("#forcast");
  forcast.innerHTML = responce.data.weather[0].description;
  let currentTemp = document.querySelector("#tempNow");
  currentTemp.innerHTML = Math.round(responce.data.main.temp);
  orginalTemp = responce.data.main.temp;
  let dayTemp = document.querySelector("#day");
  dayTemp.innerHTML = `${Math.round(responce.data.main.temp_max)}℃`;
  orginalDay = responce.data.main.temp_max;
  let nightTemp = document.querySelector("#night");
  nightTemp.innerHTML = `${Math.round(responce.data.main.temp_min)}℃`;
  orginalNyt = responce.data.main.temp_min;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(responce.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(responce.data.main.humidity);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png`
  );
}
//lat log
function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apikey = "11b98ae98b471e0d97626fd2fa0ca512";
  let apiFind = `https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
  let apiWx = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;

  axios.get(apiFind).then(showCurrentCity);
  axios.get(apiWx).then(showWx);
}

navigator.geolocation.getCurrentPosition(showLocation);

//button
function goHome() {
  navigator.geolocation.getCurrentPosition(showLocation);
  let reload = document.querySelector("#city-input");
  reload.value = `City search`;
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
    let apikey = "11b98ae98b471e0d97626fd2fa0ca512";
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apikey}&units=metric`;
    axios.get(api).then(showWx);
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
