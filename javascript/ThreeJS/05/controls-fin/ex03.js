import * as THREE from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';

// ----- TrackballControls

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

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const objects = [];
for (let i = 0; i < 10; i++) {
  const material = new THREE.MeshStandardMaterial({
    color: `rgb(
        ${50 + Math.floor(Math.random() * 205)},
        ${50 + Math.floor(Math.random() * 205)},
        ${50 + Math.floor(Math.random() * 205)}
      )`
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = `box-${i}`;
  // mesh.userData.name = `box-${i}`;
  // mesh.userData.onClick = () => { alert(11); };
  mesh.position.x = (Math.random() - 0.5) * 5;
  mesh.position.y = (Math.random() - 0.5) * 5;
  mesh.position.z = (Math.random() - 0.5) * 5;
  scene.add(mesh);
  objects.push(mesh);
}

const controls = new DragControls( objects, camera, renderer.domElement );

controls.addEventListener('dragstart', e => {
  console.log(e.object.name);
  // e.object.userData.onClick();
});
window.addEventListener('resize', setSize);
renderer.setAnimationLoop(animate);

const clock = new THREE.Clock();

function animate() {
  const delta = clock.getDelta();

  controls.update();
  
  renderer.render(scene, camera);
}

function setSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // 카메라 투영에 관련된 값에 변화가 있을 경우 실행해야 함
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}