import * as THREE from 'three';
import gsap from 'gsap';

// ----- Geometry

// Renderer
const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
// 고해상도 지원
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75, // 시야각 field of view
  window.innerWidth / window.innerHeight, // 종횡비 aspect
  0.1, // near
  1000 // far
);
camera.position.set(0, 0, 30);

// Light
const ambientLight = new THREE.AmbientLight('white', 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('white', 2);
directionalLight.position.x = 1;
directionalLight.position.z = 2;
scene.add(directionalLight);

// Mesh
// const geometry = new THREE.PlaneGeometry(20, 20, 64, 64);
const geometry = new THREE.SphereGeometry(10, 32, 32);
const material = new THREE.MeshStandardMaterial({
  color: 'dodgerblue',
  flatShading: true,
  side: THREE.DoubleSide
  // wireframe: true
});
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// 정점(Vertex) 제어
const positionArray = geometry.attributes.position.array; // 지오메트리의 모든 점의 좌표 정보
const basePositionArray = positionArray.slice(); // 배열 복제
const targetArray = positionArray.slice();
// const randomArray = [];
for(let i = 0; i < positionArray.length; i++) {
  // randomArray[i] = (Math.random() - 0.5) * 0.1;
  const offset = (Math.random() - 0.5) * 0.2;

  gsap.to(targetArray, {
    [i]: basePositionArray[i] + offset,
    duration: 1 + Math.random(),
    repeat: -1,
    yoyo: true,
    ease: 'elastic'
  });
}

// camera.lookAt(box.position);

// Event
window.addEventListener('resize', setSize);
renderer.setAnimationLoop(animate);

const clock = new THREE.Clock();

function animate() {
  // const delta = clock.getDelta();
  const time = clock.getElapsedTime();

  for (let i = 0; i < positionArray.length; i++) {
    positionArray[i] = targetArray[i];
  }

  geometry.attributes.position.needsUpdate = true;
  
  renderer.render(scene, camera);
}

function setSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // 카메라 투영에 관련된 값에 변화가 있을 경우 실행해야 함
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}