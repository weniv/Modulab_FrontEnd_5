const data = [
  {
    id: 'xxx44344basdase',
    title: '이미지 A0',
    src: 'images/a0.png'
  },
  {
    id: '2345dsftdsfdsss',
    title: '이미지 A1',
    src: 'images/a1.png'
  },
  {
    id: 'dfgg56stetsdsdf',
    title: '이미지 A2',
    src: 'images/a2.png'
  }
];

// load는 문서 내의 리소스들까지 전부 로드가 된 후
// DOMContentLoaded는 HTML 구조만 파싱이 끝나면
// window.addEventListener('load', () => {
window.addEventListener('DOMContentLoaded', () => {
  // DOM 구성
  const slideContainer = document.createElement('div');
  const slide = document.createElement('div');
  const slideWrapper = document.createElement('div');
  const slidePagination = document.createElement('div');
  const paginationItemArr = [];
  let currentIndex = 0;

  slideContainer.classList.add('slide-container');
  slide.classList.add('slide');
  slideWrapper.classList.add('slide-wrapper');
  slidePagination.classList.add('slide-pagination');

  slide.append(slideWrapper);
  slideContainer.append(slide);
  slideContainer.append(slidePagination);
  document.getElementById('temp').append(slideContainer);

  // data의 정보를 이용해서 조립
  data.forEach((info, index) => {
    const slideItem = document.createElement('figure');
    slideItem.classList.add('slide-item');
    slideItem.innerHTML = `<img src="${info.src}" alt="${info.title}">`;
    slideWrapper.append(slideItem);

    const paginationItem = document.createElement('div');
    paginationItem.classList.add('slide-pagination-item');
    paginationItem.dataset.id = info.id;
    paginationItem.dataset.index = index;

    paginationItemArr.push(paginationItem);
    slidePagination.append(paginationItem);
  });

  // Event
  // 창 사이즈 변경
  window.addEventListener('resize', () => {
    const unitSize = document.querySelector('.slide-item').clientWidth;
    slideWrapper.style.transform = `translateX(${currentIndex * -unitSize}px)`;
  });

  // 현재 문서를 보고있는지 체크(다른 탭을 볼 경우 등)
  document.addEventListener('visibilitychange', () => {
    document.hidden ? stopAutoPlay() : startAutoPlay();
  });

  slideContainer.addEventListener('click', e => {
    const el = e.target.closest('[data-index]');
    if (!el) return;
    activate(+el.dataset.index);
  });

  slideContainer.addEventListener('mouseenter', stopAutoPlay);
  slideContainer.addEventListener('mouseleave', startAutoPlay);

  // let timerId = setInterval(() => {
  //   console.log(timerId);
  // }, 1000);

  // setTimeout(() => {
  //   clearInterval(timerId);
  // }, 3000);

  let timerId;
  function startAutoPlay() {
    timerId = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= data.length) {
        nextIndex = 0;
      }
      activate(nextIndex);
    }, 5000);
  }

  function stopAutoPlay() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function activate(index) {
    // 슬라이드의 폭 * index 위치로 이동
    const unitSize = document.querySelector('.slide-item').clientWidth;
    slideWrapper.style.transform = `translateX(${index * -unitSize}px)`;

    // pagination
    const activeItem = paginationItemArr[currentIndex];
    if (activeItem) activeItem.classList.remove('active');
    paginationItemArr[index].classList.add('active');
    currentIndex = index;
  }

  activate(currentIndex);
  startAutoPlay();
});