import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ----- 그룹 만들기

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
camera.position.set(0, 1.5, 3);

// Light
const ambientLight = new THREE.AmbientLight('white', 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('white', 2); // 태양
directionalLight.position.x = 1;
directionalLight.position.z = 2;
scene.add(directionalLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Mesh
// Group
const group = new THREE.Group();
scene.add(group);

const geometry = new THREE.SphereGeometry(1, 16, 16);
const material = new THREE.MeshStandardMaterial({
  color: 'seagreen'
});
const earth = new THREE.Mesh(geometry, material);
group.add(earth);

const building = new THREE.Mesh(
  new THREE.BoxGeometry(0.2, 0.2, 0.5),
  new THREE.MeshStandardMaterial({ color: 'gray' })
);
building.position.y = 1.09;
const building2 = building.clone();
building2.position.x = 1.09;
building2.position.y = 0.7;
group.add(building, building2);

// camera.lookAt(box.position);

window.addEventListener('resize', setSize);
renderer.setAnimationLoop(animate);

const clock = new THREE.Clock();

function animate() {
  const delta = clock.getDelta();
  const time = clock.getElapsedTime();

  building.lookAt(group.position);
  building2.lookAt(group.position);

  group.position.y = Math.sin(time * 0.5) * 3;
  
  controls.update();

  renderer.render(scene, camera);
}

function setSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // 카메라 투영에 관련된 값에 변화가 있을 경우 실행해야 함
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}