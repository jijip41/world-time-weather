'use strict';

// Get time data
const form = document.querySelector('form');
const container = document.querySelector('#template__container');

function createTime(e) {
  const template = document.querySelector('#template');
  const dom_frag = template.content.cloneNode(true);
  const form_time_data = new FormData(form);
  const area = form_time_data.get('area');
  const city = form_time_data.get('city').replace(' ', '_');
  if (area && city) {
    fetch(`http://worldtimeapi.org/api/timezone/${area}/${city}`)
      .then((response) => response.json())
      .then((json) => {
        return json.datetime;
      })
      .then((data) => {
        const index = data.indexOf('T');
        const date_now = data.slice(0, index);
        const time_now = data.slice(index + 1, 19);

        dom_frag.querySelector('.date__current').textContent = date_now;
        dom_frag.querySelector('.hour__num').textContent = time_now.slice(0, 2);
        dom_frag.querySelector('.min__num').textContent = time_now.slice(3, 5);
        dom_frag.querySelector('.sec__num').textContent = time_now.slice(6, 8);
        document.querySelector('#template__container').append(dom_frag);
      });
  } else {
    alert('input!');
  }
}

// get weather data
function createWeather() {
  const form_weather_data = new FormData(form);
  const weather_city = capitalise(form_weather_data.get('city'));

  console.log(weather_city);

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${weather_city}&appid=45721c1bf9a8f0380c854c9ef9cfd90a`
  ).then((json) => {
    console.log(json);
    return json;
  });

  // document.querySelector('#template__container').append(dom_frg);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  createTime();
  createWeather();
});

function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
