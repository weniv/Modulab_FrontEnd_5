const road = document.querySelector('.road');
// let carY = -20;

export class Car {
  static carY = -20;

  constructor(name, type='🚗') {
    this.name = name;
    this.type = type;
    this.x = 0;
    console.log(this.name, this.type);

    this.init();
  }

  init() {
    const element = document.createElement('span');
    element.classList.add('car');
    element.style.top = Car.carY + 'px';
    element.innerHTML = `
      ${this.type}
      <small class="car-name">${this.name}</span>
    `;
    road.append(element);

    Car.carY += 20;

    element.addEventListener('click', this.drive.bind(this));
    // bind(this); this가 메서드 실행의 주체가 되도록 강제

    this.element = element;
  }

  drive() {
    this.x += 20;
    // console.log(this);
    this.element.style.transform = `translateX(-${this.x}px)`;
  }
}

export class PoliceCar extends Car {
  constructor(name, type='🚓') {
    super(name, type);
    // this.element.addEventListener('dblclick', this.chase.bind(this));
    this.element.addEventListener('dblclick', () => {
      this.chase();
    });
  }

  chase() {
    this.x += 100;
    this.element.style.transform = `translateX(-${this.x}px)`;
  }
}