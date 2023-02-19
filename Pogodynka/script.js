const addWeatherButton = document.querySelector('.addWeatherButton')
const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')
const wrapper = document.querySelector('.wrapper')


const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=52e27a5298f8abc6836d1cdf240dfb7d'
const API_UNITS = '&units=metric'




// function addWeather () {
// 	const createWeather = getWeather()
// 	const weatherObject = obj => {
// 		cityName.textContent = obj.city
// 		temperature.textContent = Math.floor(obj.temp) + '℃'
// 		humidity.textContent = obj.hum + '%'
// 		weather.textContent = obj.status.main

// 		warning.textContent = ''
// 		input.value = ''
// 	}
// 	const weatherElement = createWeatherElement(weatherObject())
// 	weatherContainer.insertBefore(weatherElement, addWeatherButton) 

// 	createWeather.push(weatherObject)
// 	saveWeather(createWeather)
// }



let weatherList = []
const showWeather = obj => {
	cityName.textContent = obj.city
	temperature.textContent = Math.floor(obj.temp) + '℃'
	humidity.textContent = obj.hum + '%'
	weather.textContent = obj.status.main

	warning.textContent = ''
	input.value = ''

	
	if (obj.status.id >= 200 && obj.status.id < 300) {
		photo.setAttribute('src', './img/thunderstorm.png')
	} else if (obj.status.id >= 300 && obj.status.id < 400) {
		photo.setAttribute('src', './img/drizzle.png')
	} else if (obj.status.id >= 500 && obj.status.id < 600) {
		photo.setAttribute('src', './img/rain.png')
	} else if (obj.status.id >= 600 && obj.status.id < 700) {
		photo.setAttribute('src', './img/ice.png')
	} else if (obj.status.id >= 700 && obj.status.id < 800) {
		photo.setAttribute('src', './img/fog.png')
	} else if (obj.status.id === 800) {
		photo.setAttribute('src', './img/sun.png')
	} else if (obj.status.id >= 800 && obj.status.id < 900) {
		photo.setAttribute('src', './img/cloud.png')
	} else {
		photo.setAttribute('src', './img/unknow.png')
	}
}
const getWeather = () => {
	const city = input.value
	const URL = API_LINK + city + API_KEY + API_UNITS
if (weatherList.length < 10){
	axios
		.get(URL)
		.then(res => {
			const obj = {
				 'temp' : res.data.main.temp,
				 'hum' : res.data.main.humidity,
				 'status' : Object.assign({}, ...res.data.weather),
				 'city' : res.data.name
			}

			showWeather(obj)

			weatherList.push(obj)

			localStorage.setItem('weatherList', JSON.stringify(weatherList))
		})
		.catch(() => (warning.textContent = 'Please enter a valid city name!'))
}}
const enterCheck = (e) => {
    if (e.key === 'Enter') {
        getWeather()
    }
}

const readWeather = () => {
	weatherList = JSON.parse(localStorage.getItem('weatherList') || '[]')
	weatherList.forEach(element => {
		showWeather(element)
	});
}

readWeather()


input.addEventListener('keyup', enterCheck)
getWeather()
button.addEventListener('click', getWeather)
addWeatherButton.addEventListener('click', addWeather)
