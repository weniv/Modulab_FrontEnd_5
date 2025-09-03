import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import setRaycaster from './setRaycaster.js';

// 렌더러, 카메라, 조명 설정
// Renderer
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor('#000', 0);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.y = 1.7;
scene.add(camera);

// Light
const ambientLight = new THREE.AmbientLight('#fff', 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('#fff', 0.5);
directionalLight.position.set(-1, 30, 3);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Fog
const fogColor = new THREE.Color('#000');
scene.fog = new THREE.Fog(fogColor, 10, 30);

const gltfLoader = new GLTFLoader();

// Road

// Character

// ImageUpload

// 가로등

// DisplayBoard

// Event
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
});

let isScrolling = false;
let timerId = null;

window.addEventListener('scroll', () => {
  const scrollRatio = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  
  // 스크롤 시작할 때
  if (!isScrolling) {
    isScrolling = true;
    
  }

  // 스크롤이 멈추면 idle 애니메이션으로 전환
  clearTimeout(timerId);
  timerId = setTimeout(() => {
    isScrolling = false;
    
  }, 100);
});

const mouse = { x: 0, y: 0 };
let targetRotationX = 0;
let targetRotationY = 0;
let currentRotationX = 0;
let currentRotationY = 0;
const rotationSpeed = 0.05;
const maxRotation = 0.2;
window.addEventListener('mousemove', e => {
  // 마우스 위치를 -1에서 1사이의 값으로 변환
  // const mouseX = e.clientX / window.innerWidth * 2 - 1;
  // const mouseY = e.clientY / window.innerHeight * 2 - 1;
  mouse.x = e.clientX / window.innerWidth * 2 - 1;
  mouse.y = e.clientY / window.innerHeight * 2 - 1;

  // targetRotationY = -mouseX * maxRotation;
  // targetRotationX = -mouseY * maxRotation;
  targetRotationY = -mouse.x * maxRotation;
  targetRotationX = -mouse.y * maxRotation;
});

setRaycaster({
  scene,
  camera,
  eventObject: canvas,
  onClick: function (object) {
    const name = object.name;
    if (!name) return;
    
    
  }
});

// functions
const clock = new THREE.Clock();
function animate() {
  const delta = clock.getDelta();

  // 부드러운 카메라 회전
  currentRotationX += (targetRotationX - currentRotationX) * rotationSpeed;
  currentRotationY += (targetRotationY - currentRotationY) * rotationSpeed;

  camera.rotation.x = currentRotationX;
  camera.rotation.y = currentRotationY;

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);