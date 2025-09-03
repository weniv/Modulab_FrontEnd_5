import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import setRaycaster from './setRaycaster.js';

// ----- Raycaster 설정 모듈

// Renderer
const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.y = 1.5;
camera.position.z = 4;
scene.add(camera);

// Light
const ambientLight = new THREE.AmbientLight('white', 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('white', 2);
directionalLight.position.x = 1;
directionalLight.position.z = 2;
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);
setRaycaster({
  scene,
  camera,
  eventObject: canvas,
  onClick: function (object) {
    if (object.name === 'ball') {
      object.material.color.set('lime');
    } if (object.name === 'box') {
      object.material.color.set('dodgerblue');
    }
  }
});

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: 'seagreen'
});
const box = new THREE.Mesh(geometry, material);
const geometry2 = new THREE.SphereGeometry(0.5, 32, 32);
const material2 = new THREE.MeshStandardMaterial({
  color: 'orange'
});
const ball = new THREE.Mesh(geometry2, material2);
ball.position.z = -2;
box.name = 'box';
ball.name = 'ball';
scene.add(box, ball);

const clock = new THREE.Clock();

window.addEventListener('resize', setSize);
renderer.setAnimationLoop(animate);

function animate() {
  const time = clock.getElapsedTime();

  ball.position.y = Math.sin(time*2);
  box.position.y = Math.cos(time*2);
  
  renderer.render(scene, camera);
}

function setSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}