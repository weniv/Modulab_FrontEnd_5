import * as THREE from 'three';

// 창 사이즈에 맞게 크기 조정

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

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 'dodgerblue'
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

renderer.render(scene, camera);

// Event
window.addEventListener('resize', setSize);
function setSize() {
  camera.aspect = window.innerWidth / window.innerHeight; // 종횡비
  camera.updateProjectionMatrix(); // 카메라 투영에 관련된 값에 변화가 있는 경우 실행
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}