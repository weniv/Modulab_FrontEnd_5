const controls = document.querySelector('.controls');
const inputCarName = document.querySelector('.input-car-name');

controls.addEventListener('click', e => {
  const type = e.target.dataset.type;
  if (!type) return;

  // 이름
  const carName = inputCarName.value || '우리차';

  switch (type) {
    case 'car':
      new Car(carName);
      break;
    case 'police-car':
      new PoliceCar(carName);
      break;
  }
});

inputCarName.addEventListener('focus', e => {
  e.target.select();
});