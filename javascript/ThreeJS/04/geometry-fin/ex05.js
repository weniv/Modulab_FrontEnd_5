import * as THREE from 'three';
import gsap from 'gsap';

// ----- 멋진 기하학 애니메이션

// Renderer
const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.setClearColor(0x000011);

// Scene
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000011, 50, 200);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 0);

// 여러 색상의 조명
const ambientLight = new THREE.AmbientLight('white', 0.3);
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight('#ff6b6b', 1);
directionalLight1.position.set(1, 1, 2);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight('#4ecdc4', 1);
directionalLight2.position.set(-1, -1, 2);
scene.add(directionalLight2);

const pointLight = new THREE.PointLight('#ffe66d', 0.8);
pointLight.position.set(0, 0, 15);
scene.add(pointLight);

// 큰 배경용 구체 생성
const spheres = [];
const geometries = [];

for (let i = 0; i < 5; i++) {
  const geometry = new THREE.SphereGeometry(30 + i * 15, 128, 128);
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(i * 0.15 + 0.6, 0.7, 0.4),
    flatShading: true,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.2 - i * 0.03,
    wireframe: i % 2 === 1
  });
  
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
    -20 - i * 15
  );
  scene.add(sphere);
  
  spheres.push(sphere);
  geometries.push(geometry);
  
  // 각 구체의 정점 애니메이션
  const positionArray = geometry.attributes.position.array;
  const basePositionArray = positionArray.slice();
  const targetArray = positionArray.slice();
  
  for(let j = 0; j < positionArray.length; j++) {
    const offset = (Math.random() - 0.5) * (2 + i * 0.5);
    
    gsap.to(targetArray, {
      [j]: basePositionArray[j] + offset,
      duration: 5 + Math.random() * 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: Math.random() * 5
    });
  }
  
  // 구체 회전 애니메이션 (천천히)
  gsap.to(sphere.rotation, {
    y: Math.PI * 2,
    duration: 30 + i * 10,
    repeat: -1,
    ease: 'none'
  });
  
  gsap.to(sphere.rotation, {
    x: Math.PI,
    duration: 40 + i * 15,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  
  // 위치 변화 애니메이션 (중앙 근처에서만)
  gsap.to(sphere.position, {
    x: sphere.position.x + (Math.random() - 0.5) * 30,
    y: sphere.position.y + (Math.random() - 0.5) * 30,
    duration: 20 + i * 10,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
}

// 카메라 자동 회전 (중심에서 살짝만)
gsap.to(camera.position, {
  x: 10,
  duration: 25,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});

gsap.to(camera.position, {
  y: 8,
  duration: 20,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut',
  delay: 5
});

gsap.to(camera.position, {
  z: 15,
  duration: 30,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut',
  delay: 10
});

// 조명 색상 변화
gsap.to(directionalLight1.color, {
  r: 0.2,
  g: 0.8,
  b: 1,
  duration: 8,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});

gsap.to(directionalLight2.color, {
  r: 1,
  g: 0.2,
  b: 0.8,
  duration: 6,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut',
  delay: 2
});

// Event
window.addEventListener('resize', setSize);
renderer.setAnimationLoop(animate);

const clock = new THREE.Clock();

function animate() {
  const time = clock.getElapsedTime();
  
  // 각 구체의 정점 업데이트
  geometries.forEach((geometry, index) => {
    const positionArray = geometry.attributes.position.array;
    const targetArray = geometry.userData.targetArray || positionArray;
    
    for (let i = 0; i < positionArray.length; i++) {
      positionArray[i] = targetArray[i];
    }
    
    geometry.attributes.position.needsUpdate = true;
    
    // 추가 변형 효과
    spheres[index].scale.setScalar(1 + Math.sin(time * (1 + index * 0.5)) * 0.1);
  });
  
  // 카메라가 중심을 바라보도록
  camera.lookAt(0, 0, 0);
  
  // 포인트 라이트 움직임
  pointLight.position.x = Math.sin(time * 0.5) * 20;
  pointLight.position.y = Math.cos(time * 0.3) * 15;
  
  renderer.render(scene, camera);
}

function setSize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}