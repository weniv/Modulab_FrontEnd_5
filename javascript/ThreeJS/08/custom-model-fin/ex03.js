import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import setRaycaster from './setRaycaster.js';

// ----- glb 파일 불러오기

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
directionalLight.castShadow = true;
scene.add(directionalLight);

setRaycaster({
  scene,
  camera,
  eventObject: canvas,
  onClick: function(object) {
    if (object.userData.name === '2분이') {
      const action0 = object.userData.actions[0];
      const action1 = object.userData.actions[1];
      action1.fadeOut(0.3);
      action0.reset().fadeIn(0.3).play();
    }
  }
});
const controls = new OrbitControls(camera, renderer.domElement);
const gltfLoader = new GLTFLoader();

// Mesh
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({ color: 'dodgerblue' })
);
floor.rotation.x = -Math.PI/2;
floor.receiveShadow = true;
scene.add(floor);

let mixer; // 애니메이션 믹서
gltfLoader.load(
  '/models/character2.glb',
  glb => {
    glb.scene.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true;
        child.userData.name = '2분이';
      }
    });
    // console.log(glb.scene);
    // scene.add(glb.scene.children[0]); // Mesh
    scene.add(glb.scene); // Group
    // console.log(glb.animations);
    const glbMesh = glb.scene;
    glbMesh.position.y = 0.4;
    // glbMesh.castShadow = true;

    mixer = new THREE.AnimationMixer(glbMesh);
    const actions = [];
    actions[0] = mixer.clipAction(glb.animations[0]);
    actions[1] = mixer.clipAction(glb.animations[1]);
    actions[0].repetitions = 1;
    actions[1].play();

    mixer.addEventListener('finished', e => {
      if (e.action === actions[0]) {
        actions[1].reset().fadeIn(0.8).play();
      }
    });

    glb.scene.traverse(child => {
      if (child.isMesh) {
        child.userData.actions = actions;
      }
    })
  }
);

window.addEventListener('resize', setSize);
renderer.setAnimationLoop(animate);

const clock = new THREE.Clock();

function animate() {
  const delta = clock.getDelta();
  
  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);
}

function setSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}