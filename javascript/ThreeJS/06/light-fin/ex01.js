import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ----- Light 기본

// Renderer
const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
// 그림자 설정
renderer.shadowMap.enabled = true; // 렌더러 자체에 그림자 기능 ON
// renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.shadowMap.type = THREE.BasicShadowMap;

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.y = 6;
camera.position.z = 6;
scene.add(camera);

// Light
const ambientLight = new THREE.AmbientLight('white', 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('white', 2);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024; // 512 기본값
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 10;
directionalLight.position.set(-1, 5, 2);
scene.add(directionalLight);

const helper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(helper);

const controls = new OrbitControls(camera, renderer.domElement);

// Mesh
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshLambertMaterial({
    side: THREE.DoubleSide,
    color: 'pink'
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI/2;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({
  color: 'seagreen'
});
const material2 = new THREE.MeshPhongMaterial({
  color: 'orange'
});
const box1 = new THREE.Mesh(geometry, material);
const box2 = new THREE.Mesh(geometry, material2);
box1.position.set(-2, 1, -0.5);
box2.position.set(2, 1.2, 0.5);
box1.castShadow = true;
box2.castShadow = true;
scene.add(floor, box1, box2);

window.addEventListener('resize', setSize);
renderer.setAnimationLoop(animate);

const clock = new THREE.Clock();

function animate() {
  const delta = clock.getDelta();
  
  renderer.render(scene, camera);
}

function setSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // 카메라 투영에 관련된 값에 변화가 있을 경우 실행해야 함
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}