export default class MiniSlider {
  constructor({ containerSelector, data, intervel = 2000 }) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) {
      throw new Error('컨테이너 안넣음');
    }
  }
}