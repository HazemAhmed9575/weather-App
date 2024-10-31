// ==========================================================
let WeatherApp = document.querySelector(".WeatherApp");
let CityLocation = document.querySelector(".CityLocation");
let CityTime = document.querySelector(".CityTime");
let CityName = document.querySelector("#CityName");
let Show = document.querySelector(".Show");
let butShow = document.querySelector("#butShow");
let weather = document.querySelector("#weather");
let weatherimg = document.querySelector(".weatherImg");
let weatherText = document.querySelector(".weatherText");
let temperature = document.querySelector(".temperature");
let WindSpeed = document.querySelector(".WindSpeed");
let Humidity = document.querySelector(".Humidity");
let pressure = document.querySelector(".pressure");
let errorMessage = document.querySelector(".errorMessage");
let none = document.querySelector(".none");
// ==========================================================
butShow.addEventListener("click", async () => {
  Show.classList.replace("p-5", "p-1");
  if (CityName.value == "") {
    WindSpeed.classList.replace("ok", "d-none");
    Humidity.classList.replace("ok", "d-none");
    pressure.classList.replace("ok", "d-none");
    none.classList.replace("ok", "d-none");
    weather.classList.replace("ok", "d-none");
    errorMessage.classList.replace("d-none", "ok");
    errorMessage.innerHTML = ` <h3 class=" text-danger"> NOTHING TO GEOCODE !</h3>`;
  } else {
    try {
      let res = await fetch(
        `https://pixabay.com/api/videos/?key=42510262-a578e62c7ae6b8b11ba215f3b&q=${CityName.value}`
      );
      let databackground = await res.json();
      databackground.hits[2]? (WeatherApp.style.backgroundImage = `url(${databackground.hits[2].videos.large.thumbnail})`):(WeatherApp.style.backgroundImage = `url(../images/project-bg.png)`)
        
      try {
        let res2 = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CityName.value}&units=metric&appid=47f59b4dfedf5689a1e831f96a9512dd`
        );
        let dataweather = await res2.json();
        weatherText.innerHTML = `${dataweather.weather[0].main}`;
        weatherimg.src = `images/${dataweather.weather[0].main}.png`;
        temperature.innerHTML = `${Math.round(dataweather.main.temp)}º`;
        WindSpeed.innerHTML = `${dataweather.wind.speed}`;
        Humidity.innerHTML = `${dataweather.main.humidity}`;
        pressure.innerHTML = `${dataweather.main.pressure}`;
        try {
          let res3 = await fetch(
            ` https://api.timezonedb.com/v2.1/get-time-zone?key=F0YCN1T94QV0&format=json&by=position&lat=${dataweather.coord.lat}&lng=${dataweather.coord.lon}`
          );
          DataLocation = await res3.json();
          WindSpeed.classList.replace("d-none", "ok");
          Humidity.classList.replace("d-none", "ok");
          pressure.classList.replace("d-none", "ok");
          weather.classList.replace("d-none", "ok");
          none.classList.replace("d-none", "ok");
          errorMessage.classList.replace("ok", "d-none");
          CityLocation.innerHTML = `${DataLocation.cityName} / ${DataLocation.countryName}`;
          CityTime.innerHTML = `${DataLocation.formatted}`;
        } catch (er) {
          WindSpeed.classList.replace("ok", "d-none");
          Humidity.classList.replace("ok", "d-none");
          pressure.classList.replace("ok", "d-none");
          weather.classList.replace("ok", "d-none");
          none.classList.replace("ok", "d-none");
          errorMessage.classList.replace("d-none", "ok");
          errorMessage.innerHTML = ` <h3 class=" text-danger">${er.message}</h3>`;
        }
      } catch {
        WindSpeed.classList.replace("ok", "d-none");
        Humidity.classList.replace("ok", "d-none");
        pressure.classList.replace("ok", "d-none");
        weather.classList.replace("ok", "d-none");
        none.classList.replace("ok", "d-none");
        errorMessage.classList.replace("d-none", "ok");
        errorMessage.innerHTML = ` <h3 class=" text-danger">BAD QUERY !</h3>`;
      }
    } catch {
      WindSpeed.classList.replace("ok", "d-none");
      Humidity.classList.replace("ok", "d-none");
      pressure.classList.replace("ok", "d-none");
      weather.classList.replace("ok", "d-none");
      none.classList.replace("ok", "d-none");
      errorMessage.classList.replace("d-none", "ok");
      errorMessage.innerHTML = ` <h3 class=" text-danger"> NOTHING TO GEOCODE !</h3>`;
    }
  }
});
