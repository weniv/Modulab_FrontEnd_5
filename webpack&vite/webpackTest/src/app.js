import './style.css';
import android from './android.png';
import rabbit from './tiger.png';

function plus(a, b) {
    return a + b;
}

console.log(plus(1, 3));

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `<img src="${rabbit}">`;
});
