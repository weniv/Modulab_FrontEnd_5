export default function colorControls(callback) {
  const control = document.createElement('div');
  control.classList.add('color-controls');
  control.innerHTML = `
    <div class="color-controls">
      <button class="color-btn" data-color="#ff4757" style="background: #ff4757">Red</button>
      <button class="color-btn" data-color="#2ed573" style="background: #2ed573">Green</button>
      <button class="color-btn" data-color="#3742fa" style="background: #3742fa">Blue</button>
      <button class="color-btn" data-color="#ff6348" style="background: #ff6348">Orange</button>
      <button class="color-btn" data-color="#a4b0be" style="background: #a4b0be">Gray</button>
      <button class="color-btn" data-color="reset" style="background: #f1f2f6">Reset</button>
    </div>
  `;
  document.body.append(control);

  // 스타일 추가
  const style = document.createElement('style');
  style.textContent = `
    .color-controls {
      position: fixed;
      top: 20px;
      left: 20px;
      display: flex;
      gap: 10px;
      z-index: 1000;
    }
    .color-btn {
      width: 50px;
      height: 50px;
      border: 2px solid white;
      border-radius: 50%;
      cursor: pointer;
      color: white;
      font-weight: bold;
      text-shadow: 0 1px 2px rgba(0,0,0,0.5);
      transition: transform 0.1s;
    }
    .color-btn:hover {
      transform: scale(1.1);
    }
    .color-btn[data-color="reset"] {
      color: #333;
      text-shadow: none;
    }
  `;
  document.head.appendChild(style);

  control.addEventListener('click', e => {
    const target = e.target.closest('[data-color]');
    if (target) {
      callback(target.dataset.color);
    }
  });
}