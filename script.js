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

      // let hour = realTime()
      // let min = realTime()
      // let sec = realTime(Number(time_now.slice(6)));

      dom_frag.querySelector('.date__current').textContent = date_now;
      dom_frag.querySelector('.hour__num').textContent = time_now.slice(0, 2);
      dom_frag.querySelector('.min__num').textContent = time_now.slice(3, 5);
      dom_frag.querySelector('.sec__num').textContent = time_now.slice(6, 8);
      console.log(date_now);
      console.log(time_now);

      document.querySelector('#template__container').append(dom_frag);

      // time passed

      let count_time = 0;
      setInterval(() => {}, 1000);

      // function for real time

      // function countSec(num){
      //   setInterval((num) => {
      //     num++
      //     return num;
      //   }, 1000);

      // }
    });
}

form.addEventListener('submit', createContent);
