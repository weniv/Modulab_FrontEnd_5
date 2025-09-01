import * as THREE from 'three';

// 기본 장면

// Renderer
// 1. 캔버스 동적으로 생성하기
// const renderer = new THREE.WebGLRenderer();
// renderer.domElement.id = 'three-canvas';
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.append(renderer.domElement);

// 2. HTML에 있는 캔버스 이용하기
const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({
  canvas
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75, // 시야각(fov)
  window.innerWidth / window.innerHeight, // 종횡비(aspect)
  0.1, // near
  1000 // far
);
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 'dodgerblue'
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

renderer.render(scene, camera);