//* Variables Assignation
const locationDisplay = document.querySelector('[data-location]');
const icon = document.querySelector('[data-icon]');
const currentTemperature = document.querySelector('[data-currenttemp]');
const condition = document.querySelector('[data-condition]');
const backgroundApp = document.querySelector('body');
const windDirection = document.querySelector('[data-winddir]');
const humidity = document.querySelector('[data-humidity]');
const feelsLike = document.querySelector('[data-feelslike]');
const windSpeed = document.querySelector('[data-windspeed]');

//*  Cities

let firstPoint = 'https://weatherapi-com.p.rapidapi.com/current.json?q=Medellin';
let endpoint;


function replaceCity(argument) {
    const arr = firstPoint.split('=');
    arr[1] = argument;
    endpoint = arr.join('=');
    console.log(endpoint)
} 

replaceCity()
//* Fetch data

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '584cee3d4cmshbc7ed3c23b24627p11e5c4jsn1dfbb3334930',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};
//? =========================

let place;

//? =========================
function fetchByCity(url) {
    fetch(url, options)
	.then(response => response.json())
	.then(response => response)
    .then(response => {
        let arr = Object.keys(response);
        place = arr.map(function(key){
            return {[key] : response[key]}
        })
    })
	.catch(err => console.error(err));   
}

// fetchByCity(endpoint);

//* Speech Recognition

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "es";
recognition.interimResults = true;



function speechToText(e){
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
    ;
    console.log(transcript);

            
    replaceCity(transcript);
    fetchByCity(endpoint);
    console.log(place);
    const tempy = place[1].current.temp_c;
    locationDisplay.textContent = place[0].location.name;
    icon.src = place[1].current.condition.icon;
    currentTemperature.textContent = `${tempy}°c`;
    condition.textContent = place[1].current.condition.text;
    windDirection.textContent = place[1].current.wind_dir;
    humidity.textContent = place[1].current.humidity;
    const fLike = place[1].current.feelslike_c;
    feelsLike.textContent = `${fLike}°c`;
    const wSpeed = place[1].current.wind_kph
    windSpeed.textContent = `${wSpeed} km/h`;


    const dayNight = place[1].current.is_day;
    
    if (dayNight === 0) {
        backgroundApp.classList.remove('day');
        backgroundApp.classList.add('night');
    } else {
        backgroundApp.classList.remove('night');
        backgroundApp.classList.add('day');
    }

    console.log(dayNight)
    console.log(backgroundApp)
    recognition.stop(); 
} 

recognition.addEventListener('result', speechToText);
//recognition.addEventListener('end', recognition.start);
function startListening() {
    recognition.start();
}

fetchByCity(endpoint)
console.log(place[0])










