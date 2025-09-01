import * as THREE from 'three';
import gsap from 'gsap';

// 라이브러리를 이용한 애니메이션

// Renderer
const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // 픽셀 집적도 조정(고해상도 디스플레이 대응)

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75, // 시야각(fov)
  window.innerWidth / window.innerHeight, // 종횡비(aspect)
  0.1, // near
  1000 // far
);
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Light
const ambientLight = new THREE.AmbientLight('white', 0.5);
// AmbientLight: 톤만 조정
// scene.add(ambientLight);
const spotLight = new THREE.SpotLight('white', 100);
spotLight.position.set(1, 3, 3);
scene.add(ambientLight, spotLight);

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({
  color: 'dodgerblue'
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// gsap
gsap.to(
  mesh.position,
  {
    duration: 1,
    x: 3,
    ease: 'elastic'
  }
);

const clock = new THREE.Clock();
function animate() {
  const delta = clock.getDelta();

  renderer.render(scene, camera);
}

// camera.lookAt(mesh.position);
renderer.setAnimationLoop(animate);
animate();

// Event
window.addEventListener('resize', setSize);
function setSize() {
  camera.aspect = window.innerWidth / window.innerHeight; // 종횡비
  camera.updateProjectionMatrix(); // 카메라 투영에 관련된 값에 변화가 있는 경우 실행
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}