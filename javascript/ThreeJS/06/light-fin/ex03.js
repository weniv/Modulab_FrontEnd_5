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

const pointLight = new THREE.PointLight('yellow', 100);
pointLight.castShadow = true;
pointLight.position.set(0, 2, 0);
scene.add(pointLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
// scene.add(directionalLightHelper, pointLightHelper);

// ----- Fireflies (반딧불) ----- 
const fireflies = [];
const fireflyCount = 10;

for (let i = 0; i < fireflyCount; i++) {
  const light = new THREE.PointLight('lightgreen', 200, 3); 
  light.castShadow = false; // 그림자는 성능상 비활성화
  light.position.set(
    (Math.random() - 0.5) * 8, // -4 ~ 4
    Math.random() * 3 + 1,     // 1 ~ 4 높이
    (Math.random() - 0.5) * 8
  );
  scene.add(light);

  // 반딧불을 눈에 보이게 하는 작은 구체
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 8, 8),
    new THREE.MeshBasicMaterial({ color: 'lightgreen' })
  );
  light.add(sphere);

  fireflies.push({
    light,
    speed: Math.random() * 0.5 + 0.5,   // 움직임 속도
    radius: Math.random() * 2 + 1,      // 원 궤도 반경
    offset: Math.random() * Math.PI * 2 // 시작 위치
  });
}


const controls = new OrbitControls(camera, renderer.domElement);

// Mesh
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshLambertMaterial({
    side: THREE.DoubleSide,
    color: 'midnightblue'
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
  // const delta = clock.getDelta();
  const time = clock.getElapsedTime();

  pointLight.position.x = Math.cos(time * 2) * 3;
  pointLight.position.z = Math.sin(time * 2) * 3;
  pointLight.position.y = Math.sin(time * 10) + 2;

  // 반딧불들 움직임
  fireflies.forEach((f, i) => {
    f.light.position.x = Math.cos(time * f.speed + f.offset) * f.radius;
    f.light.position.z = Math.sin(time * f.speed + f.offset) * f.radius;
    f.light.position.y = Math.sin(time * f.speed * 2 + f.offset) * 1.5 + 2;
  });
  
  renderer.render(scene, camera);
}

function setSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // 카메라 투영에 관련된 값에 변화가 있을 경우 실행해야 함
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}