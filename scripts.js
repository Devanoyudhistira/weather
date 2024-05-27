const form = document.querySelector("form");
const search = document.querySelector("input");
const error = document.querySelector(".weather-error");
const main = document.querySelector("main");
const searching = document.querySelector(".searching");
const decor = document.querySelectorAll(".decor");
const success = document.querySelector(".weather-success");
const weatherdetail = document.querySelector(".weather-detail");
const wind = document.querySelector(".wind-speed p");
const humidity = document.querySelector(".humidity p");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  city = search.value;
  console.log(city);

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a5b581a7e9f05ec992261b0c738adf21`
  )
    .then((Response) => Response.json())
    .then((json) => {
      if (json.cod === "404") {
        error.classList.add("active");
        main.classList.add("error");
        searching.classList.add("inactive");
        decor.forEach((e) => {
          e.classList.remove("active");
        });
        document.querySelector(".temp").style.display = "none";
        document.querySelector(".weather").style.display = "none";
        success.classList.add("remove");
        weatherdetail.classList.remove('active')
        return;
      }

      error.classList.remove("active");

      switch (json.weather[0].main) {
        case "Clear":
          searching.classList.add("inactive");
          error.classList.remove("active");
          // main.classList.remove("error");
          main.className = "";
          main.classList.add("clear");
          decor.forEach((e) => {
            e.classList.add("active");
          });
          success.classList.add("active");
          document.querySelector(".temp").style.display = "block";
          document.querySelector(".weather").style.display = "block";
          break;
        case "Clouds":
          searching.classList.add("inactive");
          error.classList.remove("active");
          main.className = "";
          main.classList.add("cloud");
          decor.forEach((e) => {
            e.classList.add("active");
          });

          break;
        case "rain":
          error.classList.remove("active");
          main.className = "";
          searching.classList.add("inactive");
          main.classList.add("cloud");
          decor.forEach((e) => {
            e.classList.add("active");
          });
          success.classList.add("active");
          document.querySelector(".temp").style.display = "block";
          document.querySelector(".weather").style.display = "block";
          break;
        case "snow":
          error.classList.remove("active");
          main.className = "";
          searching.classList.add("inactive");
          main.classList.add("snow");
          decor.forEach((e) => {
            e.classList.add("active");
          });
          break;

        default:
          main.classList.add("error");
      }

      document.querySelector(".weather").textContent =
        json.weather[0].description;
      document.querySelector(".temp").textContent = parseFloat(json.main.temp);
      weatherdetail.classList.add("active");
      success.classList.add("active");
      document.querySelector(".temp").style.display = "block";
      document.querySelector(".weather").style.display = "block";
      weatherdetail.classList.add('active')
      humidity.textContent = `${json.main.humidity}%`
      wind.textContent = `${json.wind.speed}Km/H`
    });
});
