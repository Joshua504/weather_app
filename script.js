const inputEl = document.querySelector(".container__inpt");
const searchBtn = document.querySelector(".container__btn");
const displayUserInput = document.querySelector(".container__md-txt");
const container = document.querySelector(".container");
const wrapper = document.querySelector(".wrap");
/* -------------------------------- functions ------------------------------- */

searchBtn.addEventListener("click", searchNow);

function searchNow() {
	let userInput = inputEl.value;
	inputEl.value = " ";
	getCurrentWeather(userInput);
}

const apiKey = "ed1f7debc1cbbbd6f1ffaf116e176e1b";

const getCurrentWeather = (city) => {
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

	fetch(apiUrl)
		.then((response) => response.json())
		.then((data) => {
			if (data.cod === "404") {
				alert("Please enter a valid city name");
			} else if (inputEl.value === "") {
				alert("Please enter a city name");
			} else {
				const dataName = data.name;
				const dataTemp = Math.round(data.main.temp);
				const dataDescription = data.weather[0].main;

				document.querySelector(".container__item2").style.visibility =
					"visible";
				document.querySelector(".container__item3").style.display = "block";

				if (dataDescription === "Clouds") {

					document.querySelector(".lg__img").src = "/assets/cloudy.svg";
					wrapper.style.background = "#aeb5c7";
					container.style["background-color"] = "aeb5c7";
					container.style["boxShadow"] =
						"-18px -18px 36px #949aa9, 18px 18px 36px #c8d0e5";

				} else if (dataDescription === "Rain") {

					document.querySelector(".lg__img").src = "/assets/rainy-7.svg";
					wrapper.style.background = "#5780c5";
					container.style.background = "#5780c5";
					container.style["boxShadow"] =
						"-32px 32px 64px #4a6da7,32px -32px 64px #6493e3";

				} else if (dataDescription === "thunderstorm") {

					document.querySelector(".lg__img").src = "/assets/thunder.svg";
					wrapper.style.background = "#30639c";
					container.style.background = "#30639c";
					container.style["boxShadow"] =
						"-30px 30px 60px #295485,30px -30px 60px #3772b3";

				} else if (dataDescription === "snow") {

					document.querySelector(".lg__img").src = "/assets/snowy-5.svg";
					wrapper.style.background = "#f1fbff";
					container.style["background-color"] = "#f1fbff";
					container.style["boxShadow"] =
						"  -30px 30px 60px #767b7d,30px -30px 60px #ffffff";

				} else if (dataDescription === "Clear") {

					document.querySelector(".lg__img").src = "/assets/day.svg";
					wrapper.style.background = "#ffba00";
					container.style["background-color"] = "#ffba00";
					container.style["boxShadow"] =
						"-33px 33px 66px #d99e00,33px -33px 66px #ffd600";

				} else if (dataDescription === "Drizzle") {

					document.querySelector(".lg__img").src = "/assets/rainy-4.svg";
					wrapper.style.background = "#5780c5";
					container.style.background = "#5780c5";
					container.style["boxShadow"] =
						"-32px 32px 64px #4a6da7,32px -32px 64px #6493e3";

				} else if (dataDescription === "night") {

					document.querySelector(".lg__img").src = "/assets/night.svg";

				}

				document.querySelector(".weather__degree").textContent =
					dataTemp + "°С";
				document.querySelector(".description").textContent = dataDescription;
				document.querySelector(".container__md-txt").textContent = dataName;
			}

			getWeatherForecast(city);
		})
		.catch((error) => {
			console.error(error);
		});
};

const getWeatherForecast = (name) => {
	const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${name}&units=metric&appid=${apiKey}`;

	fetch(apiUrl)
		.then((response) => response.json())
		.then((data) => {
			const resData = data.list.slice(0, 5);

			document.querySelector(".weather__fc").innerHTML = "";

			for (let i = 0; i <= resData.length; i++) {
				const forTemp = Math.round(resData[i].main.temp);
				const forDescription = resData[i].weather[0].main;

				let imgSrc;

				if (forDescription === "Clouds") {
					imgSrc = "/assets/cloudy.svg";
				} else if (forDescription === "Rain") {
					imgSrc = "/assets/rainy-7.svg";
				} else if (forDescription === "thunderstorm") {
					imgSrc = "/assets/thunder.svg";
				} else if (forDescription === "snow") {
					imgSrc = "/assets/snowy-5.svg";
				} else if (forDescription === "Clear") {
					imgSrc = "/assets/day.svg";
				} else if (forDescription === "Drizzle") {
					imgSrc = "/assets/rainy-4.svg";
				} else if (forDescription === "night") {
					imgSrc = "/assets/night.svg";
				}

				let structure = `
					<li class="weather__days">
							<div>
								<img class="for--img" src="${imgSrc}" alt="" />
							</div>
							<h3 class="deg">${forTemp}°С</h3>
					</li>
				`;

				document.querySelector(".weather__fc").innerHTML += structure;
			}
		})
		.catch((error) => {
			console.error(error);
		});
};
