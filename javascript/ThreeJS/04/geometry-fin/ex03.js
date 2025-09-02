import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
camera.position.set(0, 0, 5);

// Light
const ambientLight = new THREE.AmbientLight('white', 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('white', 2);
directionalLight.position.x = 1;
directionalLight.position.z = 2;
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);

// Mesh
const geometry = new THREE.PlaneGeometry(5, 5, 16, 16);
const material = new THREE.MeshStandardMaterial({
  color: 'dodgerblue',
  flatShading: true,
  // side: THREE.DoubleSide
  // wireframe: true
});
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// 정점(Vertex) 제어
const positionArray = geometry.attributes.position.array; // 지오메트리의 모든 점의 좌표 정보
const basePositionArray = positionArray.slice(); // 배열 복제
const randomArray = [];
for(let i = 0; i < positionArray.length; i++) {
  randomArray[i] = (Math.random() - 0.5) * 0.1;
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
    positionArray[i] = basePositionArray[i] + Math.sin(time + randomArray[i] * 100) * 0.07;
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