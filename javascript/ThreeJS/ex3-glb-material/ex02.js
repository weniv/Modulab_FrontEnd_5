import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import setRaycaster from './setRaycaster.js';
import colorControls from './colorControls.js';

// ----- glb 파일 Material 변경 해보기

// Renderer
const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.shadowMap.enabled = true;

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('white');

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.y = 2;
camera.position.z = 3;
scene.add(camera);

// Light
const ambientLight = new THREE.AmbientLight('white', 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('white', 2);
directionalLight.position.x = 1;
directionalLight.position.z = 2;
directionalLight.castShadow = true;
scene.add(directionalLight);

const spotLight1 = new THREE.SpotLight('#ff6b6b', 10, 10, Math.PI * 0.15, 0.3, 1);
spotLight1.position.set(-3, 4, 2);
spotLight1.castShadow = true;
spotLight1.target.position.set(0, 0.5, 0);
scene.add(spotLight1);
scene.add(spotLight1.target);

const spotLight2 = new THREE.SpotLight('#4ecdc4', 10, 8, Math.PI * 0.2, 0.2, 1);
spotLight2.position.set(3, 3, -1);
spotLight2.castShadow = true;
spotLight2.target.position.set(0, 0.5, 0);
scene.add(spotLight2);
scene.add(spotLight2.target);

const spotLight3 = new THREE.SpotLight('#ffe66d', 10, 6, Math.PI * 0.25, 0.4, 1);
spotLight3.position.set(0, 5, 3);
spotLight3.castShadow = true;
spotLight3.target.position.set(0, 0.5, 0);
scene.add(spotLight3);
scene.add(spotLight3.target);

setRaycaster({
  scene,
  camera,
  eventObject: canvas,
  onClick: function(object) {
    console.log(object);
  }
});
const controls = new OrbitControls(camera, renderer.domElement);
const gltfLoader = new GLTFLoader();

// Mesh
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({ color: 'white', side: THREE.DoubleSide })
);
floor.rotation.x = -Math.PI/2;
floor.receiveShadow = true;
scene.add(floor);

let modelObject;
let originalMaterial;
let currentMaterial;

function changeColor(color) {
  if (!modelObject) return;
  
  modelObject.traverse(child => {
    if (child.isMesh) {
      console.log('Mesh name:', child.name);
      const isBody = child.name.includes('basecolor');
      const isAppleLogo = child.name.includes('apple_logo');

      if (isAppleLogo) {
        if (color === 'reset') {
          child.material = child.userData.originalMaterial || originalMaterial;
        } else {
          if (!child.userData.originalMaterial) {
            child.userData.originalMaterial = child.material.clone();
          }
          const newMaterial = child.userData.originalMaterial.clone();
          newMaterial.color.set(color);
          child.material = newMaterial;
        }
      }
    }
  });
}

gltfLoader.load(
  '/models/iphone_16_pro_max.glb',
  glb => {
    glb.scene.traverse(child => {
      if (child.isMesh) {
        // console.log(child)
        child.castShadow = true;
        child.userData.name = 'iPhone';
        
        // 원본 재질 저장 (최초 한 번만)
        if (!originalMaterial) {
          originalMaterial = child.material;
          currentMaterial = originalMaterial;
        }
      }
    });

    colorControls(changeColor);

    // 중심점 조정을 위한 컨테이너 생성
    const container = new THREE.Group();
    
    // 바운딩 박스로 중심점 계산
    const box = new THREE.Box3().setFromObject(glb.scene);
    const center = box.getCenter(new THREE.Vector3());
    
    // GLB를 중심점 기준으로 정렬
    glb.scene.position.copy(center).multiplyScalar(-1);
    
    container.add(glb.scene);
    scene.add(container);
    
    modelObject = container;
    // modelObject.scale.set(10, 10, 10);
    modelObject.position.y = 1;
    modelObject.rotation.z = 0.3;
  }
);

window.addEventListener('resize', setSize);
renderer.setAnimationLoop(animate);

const clock = new THREE.Clock();

function animate() {
  const delta = clock.getDelta();

  if (modelObject) modelObject.rotation.y += delta * 2;

  renderer.render(scene, camera);
}

function setSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}