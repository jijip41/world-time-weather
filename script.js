'use strict';

// Get time data

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const container = document.querySelector('#template__container');
  const template = document.querySelector('#template');
  const dom_frag = template.content.cloneNode(true);

  const form_time_data = new FormData(form);
  const area = form_time_data.get('area');
  const city = form_time_data.get('city').replace(' ', '_');

  if (area && city) {
    fetch(`https://worldtimeapi.org/api/timezone/${area}/${city}`)
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
      });
  } else {
    alert('input!');
  }

  // get weather data

  const form_weather_data = new FormData(form);
  const weather_city = capitalise(form_weather_data.get('city'));

  fetch(
    `https://api.weatherbit.io/v2.0/current?city=${weather_city}&key=ef858dae1f9649658ab6ae42c345aa36&include=minutely`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json.data[0].weather.icon;
    })
    .then((data) => {
      let weather_icon = data;
      dom_frag.querySelector(
        '.weather__img'
      ).src = `https://www.weatherbit.io/static/img/icons/${weather_icon}.png`;

      container.append(dom_frag);
    });
});

function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
