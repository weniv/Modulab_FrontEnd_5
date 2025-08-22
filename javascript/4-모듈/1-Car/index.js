import {
  Car,
  PoliceCar
} from './Car.js';
// import * as CAR from './Car.js';

const controls = document.querySelector('.controls');
const inputCarName = document.querySelector('.input-car-name');

controls.addEventListener('click', e => {
  const type = e.target.dataset.type;
  if (!type) return;

  // 이름
  const carName = inputCarName.value || '우리차';

  switch (type) {
    case 'car':
      // new CAR.Car(carName);
      new Car(carName);
      break;
    case 'police-car':
      // new CAR.PoliceCar(carName);
      new PoliceCar(carName);
      break;
  }
});

inputCarName.addEventListener('focus', e => {
  e.target.select();
});