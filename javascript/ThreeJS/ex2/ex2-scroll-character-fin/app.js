import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import setRaycaster from './setRaycaster.js';
import Road from './Road.js';
import Character from './Character.js';
import { Decoration, DisplayBoard } from './Decoration.js';
import ImageUpload from './ImageUpload.js';

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

const roadLength = 70;
// Road
const road = new Road(scene, roadLength);

// Character
let currentZ = -5; // 시작 위치
const maxZ = 40; // 캐릭터 이동 범위는 40 이내로
camera.position.z = currentZ + 3.5;

const character = new Character({
  scene,
  gltfLoader,
  position: new THREE.Vector3(0, 0.55, currentZ)
});

// ImageUpload
const imageUpload = new ImageUpload(character);

// 가로등
new Decoration({
  name: 'streetlight',
  scene,
  gltfLoader,
  glbPath: '/models/streetlight.glb',
  onLoad() {
    const pointLight = new THREE.PointLight('#fff', 25);
    pointLight.position.set(-1.7, 1.9, 0);
    pointLight.castShadow = true;
    this.mesh.add(pointLight);

    for (let z = 5; z > -70; z -= 15) { 
      // 왼쪽 가로등
      const leftStreetlight = this.mesh.clone();
      leftStreetlight.position.set(-3, 2, z);
      leftStreetlight.rotation.y = THREE.MathUtils.degToRad(180);
      scene.add(leftStreetlight);
      // 오른쪽 가로등
      const rightStreetlight = this.mesh.clone();
      rightStreetlight.position.set(3, 2, z);
      scene.add(rightStreetlight);
    }
  }
});

// DisplayBoard
const displayBoard = new DisplayBoard({
  name: 'displayBoard',
  scene,
  gltfLoader,
  glbPath: '/models/displayBoard.glb',
  position: new THREE.Vector3(3, 2, -35)
});

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
  
  // 스크롤 시작할 때 run
  if (!isScrolling) {
    isScrolling = true;
    character.run();
  }

  currentZ = -5 - scrollRatio * maxZ;
  character.setPosition('z', currentZ);
  camera.position.z = currentZ + 3.5;

  // 스크롤이 멈추면 idle 애니메이션으로 전환
  clearTimeout(timerId);
  timerId = setTimeout(() => {
    isScrolling = false;
    character.idle();
  }, 100);
});

window.addEventListener('keydown', e => {
  if (e.code === 'Space' && character) {
    character.jump();
  }
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
    console.log(object)
    const name = object.name;
    if (!name) return;
    
    switch (name) {
      case 'character':
        console.log('캐릭터 클릭');
        imageUpload.show();
        break;

      case 'displayBoard':
        console.log('전광판 클릭');
        displayBoard.loadRandomDogImage();
        break;
    }
  }
});

// functions
const clock = new THREE.Clock();
function animate() {
  const delta = clock.getDelta();
  character.update(delta);

  // 부드러운 카메라 회전
  currentRotationX += (targetRotationX - currentRotationX) * rotationSpeed;
  currentRotationY += (targetRotationY - currentRotationY) * rotationSpeed;

  camera.rotation.x = currentRotationX;
  camera.rotation.y = currentRotationY;

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);



// window.addEventListener('click', e => {
//   if (isDragging) return;

//   // 마우스 위치를 정규화된 좌표로 변환
//   mouse.x = e.clientX / window.innerWidth * 2 - 1;
//   mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

//   raycaster.setFromCamera(mouse, camera);

//   const intersects = raycaster.intersectObjects(scene.children, true);
//   // true: 전달한 객체들의 모든 하위 자식까지 검사
//   // false: 직계 자식만 검사

//   if (intersects.length > 0) {
//     const clickedObject = intersects[0].object;
//     // userData name이 세팅된 것들만 처리하도록
//     // const name = clickedObject.userData.name;
//     // name이 세팅된 것들만 처리하도록
//     const name = clickedObject.name;
//     if (!name) return;
    
//     switch (name) {
//       case 'character':
//         console.log('캐릭터 클릭');
//         imageUpload.show();
//         break;

//       case 'displayBoard':
//         console.log('전광판 클릭');
//         displayBoard.loadRandomDogImage();
//         break;
//     }
//   }
// });