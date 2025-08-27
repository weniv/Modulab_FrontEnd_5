import MiniAlert from './mini-alert.js';

const API_KEY = 'https://api.openweathermap.org에서 발급받은 API 키를 넣으세요';

// `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

const input = document.getElementById('city-input');
const button = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const weatherInfo = document.getElementById('weather-info');

button.addEventListener('click', searchWeather);
input.addEventListener('keydown', e => {
  if (e.code === 'Enter') {
    searchWeather();
  }
})

async function searchWeather() {
  const city = input.value.trim();
  
  if (!city) {
    MiniAlert.fire({
      // title: '앗!',
      message: '도시 이름을 입력해 주세요.'
    });
    return;
  }

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

    if (!res.ok) throw new Error('도시를 찾을 수 없습니다!');

    // 조회 성공
    const data = await res.json();
    const name = data.name;
    const temp = data.main.temp;
    const desc = data.weather[0].description;

    cityName.textContent = name;
    weatherInfo.textContent = `섭씨 ${temp}도 / ${desc}`;
    input.value = '';

    let weatherStr = '';
    // console.log(desc.indexOf('cloud'));
    if (desc.indexOf('cloud') >= 0) {
      weatherStr = 'cloud';
    } else if (desc.indexOf('rain') >= 0) {
      weatherStr = 'rain';
    } else if (desc.indexOf('snow') >= 0) {
      weatherStr = 'snow';
    } else if (desc.indexOf('clear') >= 0) {
      weatherStr = 'clear';
    } else {
      weatherStr = '???';
    }

    setBackgroundEffect(weatherStr);

  } catch (err) {
    console.error(err);
  }
}

function setBackgroundEffect(weather) {
  switch (weather) {
    case 'cloud':
      document.body.style.background = 'gainsboro';
      break;
    case 'rain':
      document.body.style.background = 'lightsteelblue';
      break;
    case 'snow':
      document.body.style.background = 'aliceblue';
      break;
    case 'clear':
      document.body.style.background = 'lightyellow';
      break;
    case '???':
      document.body.style.background = 'fuchisia';
      break;
  }
}