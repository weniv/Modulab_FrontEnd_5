export default class MiniSlider {
  constructor({ containerSelector, data, interval = 2000 }) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) {
      throw new Error('컨테이너 안넣음');
    }

    this.interval = interval;
    this.currentIndex = 0; // 현재 활성화된 인덱스
    this.timerId = null; // setInterval이 리턴하는 값을 저장
    this.paginationItemArr = [];
    this.data = data;

    // DOM 구성
    this.slideContainer = document.createElement('div');
    this.slide = document.createElement('div');
    this.slideWrapper = document.createElement('div');
    this.slidePagination = document.createElement('div');

    this.slideContainer.classList.add('slide-container');
    this.slide.classList.add('slide');
    this.slideWrapper.classList.add('slide-wrapper');
    this.slidePagination.classList.add('slide-pagination');

    this.slide.append(this.slideWrapper);
    this.slideContainer.append(this.slide);
    this.slideContainer.append(this.slidePagination);
    
    this.container.append(this.slideContainer);

    // data의 정보를 이용해서 조립
    this.data.forEach((info, index) => {
      const slideItem = document.createElement('figure');
      slideItem.classList.add('slide-item');
      slideItem.innerHTML = `<img src="${info.src}" alt="${info.title}">`;
      this.slideWrapper.append(slideItem);

      const paginationItem = document.createElement('div');
      paginationItem.classList.add('slide-pagination-item');
      paginationItem.dataset.id = info.id;
      paginationItem.dataset.index = index;

      this.paginationItemArr.push(paginationItem);
      this.slidePagination.append(paginationItem);
    });

    // Event
    // 창 사이즈 변경
    window.addEventListener('resize', () => {
      const unitSize = this.slideContainer.querySelector('.slide-item').clientWidth;
      this.slideWrapper.style.transform = `translateX(${this.currentIndex * -unitSize}px)`;
    });

    // 현재 문서를 보고있는지 체크(다른 탭을 볼 경우 등)
    document.addEventListener('visibilitychange', () => {
      document.hidden ? this.stopAutoPlay() : this.startAutoPlay();
    });

    this.slideContainer.addEventListener('click', e => {
      const el = e.target.closest('[data-index]');
      if (!el) return;
      this.activate(+el.dataset.index);
    });

    this.slideContainer.addEventListener('mouseenter', () => {
      this.stopAutoPlay();
    });
    this.slideContainer.addEventListener('mouseleave', () => {
      this.startAutoPlay();
    });

    this.activate(this.currentIndex);
  }

  startAutoPlay() {
    this.timerId = setInterval(() => {
      let nextIndex = this.currentIndex + 1;
      if (nextIndex >= this.data.length) {
        nextIndex = 0;
      }
      this.activate(nextIndex);
    }, 5000);
  }

  stopAutoPlay() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  activate(index) {
    // 슬라이드의 폭 * index 위치로 이동
    const unitSize = this.slideContainer.querySelector('.slide-item').clientWidth;
    this.slideWrapper.style.transform = `translateX(${index * -unitSize}px)`;

    // pagination
    const activeItem = this.paginationItemArr[this.currentIndex];
    if (activeItem) activeItem.classList.remove('active');
    this.paginationItemArr[index].classList.add('active');
    this.currentIndex = index;
  }
}