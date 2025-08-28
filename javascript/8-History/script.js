const menu = document.querySelector('.menu');
const content = document.querySelector('.content');

window.addEventListener('load', () => {
  const page = window.location.pathname.slice(1);
  changePage(page);
});

menu.addEventListener('click', e => {
  if (e.target.nodeName !== 'A') return;

  e.preventDefault(); // 이벤트 기본동작 취소
  console.log(e.target.dataset.id);
  changePage(e.target.dataset.id);
});

window.addEventListener('popstate', e => {
  console.log(e.state)
  displayContent(e.state.page);
});

function changePage(page) {
  // 내용 표시
  displayContent(page);

  // 방문 이력 남기기
  history.pushState({ page }, `Title: ${page}`, `/${page}`);
}

function displayContent(page) {
  if (!page) {
    content.textContent = '홈홈';
  } else {
    content.textContent = `현재 페이지: ${page}`;
  }
}