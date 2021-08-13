'use strict';

const form = document.querySelector('form');
const container = document.querySelector('#template__container');

function createContent(e) {
  e.preventDefault();

  const form_data = new FormData(form);
  const area = form_data.get('area');
  const city = form_data.get('city').replace(' ', '_');

  const template = document.querySelector('#template');
  const dom_frag = template.content.cloneNode(true);

  fetch(`http://worldtimeapi.org/api/timezone/${area}/${city}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json.datetime);
      return json.datetime;
    })
    .then((data) => {
      const index = data.indexOf('T');
      const date_now = data.slice(0, index);
      const time_now = data.slice(index + 1, 19);
    });
}
