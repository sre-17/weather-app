async function fetchweather(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`, { mode: 'cors' });
  const weatherObj = await response.json();
  return weatherObj;
}

function updateCard(weatherObj, city) {
  const h2 = document.querySelector('h2');
  const description = document.querySelectorAll('#description > li');
  const temperature = document.querySelectorAll('#temperature > li');
  const additionalInfo = document.querySelectorAll('#additional-info > p');

  h2.textContent = city;
  description[0].textContent = weatherObj.weather[0].main;
  description[1].textContent = `"${weatherObj.weather[0].description}"`;
  temperature[0].textContent = `Temperature: ${weatherObj.main.temp}`;
  temperature[1].textContent = `Feels Like: ${weatherObj.main.feels_like}`;
  additionalInfo[0].textContent = `Humidity: ${weatherObj.main.humidity}`;
  additionalInfo[1].textContent = `Pressure: ${weatherObj.main.pressure}`;
  additionalInfo[2].textContent = `Temperature: (Max,Min):(${weatherObj.main.temp_max},${weatherObj.main.temp_min})`;
}

async function run(city) {
  const weatherObj = await fetchweather(city);
  if (weatherObj.cod === '404') {
    console.log(weatherObj.message);
  } else {
    console.log(weatherObj);
    updateCard(weatherObj, city);
  }
}

function submitquery() {
  const input = document.querySelector('#search-box');
  run(input.value);
}
function handleForm(e) {
  e.preventDefault();
  submitquery();
}

const form = document.querySelector('form');
form.addEventListener('submit', handleForm);
