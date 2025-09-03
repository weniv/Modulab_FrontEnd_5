import {
  AnimationMixer,
  PlaneGeometry,
  MeshStandardMaterial,
  DoubleSide,
  Mesh,
  TextureLoader
} from 'three';
import gsap from 'gsap';

export default class Character {
  constructor({ scene, gltfLoader, position }) {
    this.mesh = null;
    this.mixer = null;
    this.actions = []; // animation 동작들

    gltfLoader.load(
      '/models/character.glb',
      glb => {
        glb.scene.traverse(child => {
          if (child.isMesh) {
            child.castShadow = true;
            // click: 메모장같은 userData 사용
            // child.userData.name = 'character';
            child.name = 'character';
          }
        });

        this.mesh = glb.scene.children[0]; // plane 붙이려면 children[0]으로
        this.mesh.position.copy(position);
        scene.add(this.mesh);

        this.mixer = new AnimationMixer(this.mesh);
        this.actions[0] = this.mixer.clipAction(glb.animations[0]);
        this.actions[1] = this.mixer.clipAction(glb.animations[1]);

        this.actions[0].play();

        // Face Planes
        const { plane1, plane2 } = this.createFacePlanes();
        this.plane1 = plane1;
        this.plane2 = plane2;
        this.setFaceTexture();

        plane1.position.set(0, 0.6, 0.21); // 앞
        plane2.position.set(0, 0.6, -0.21); // 뒤

        this.mesh.children[1].add(plane1, plane2);
      }
    );
  }

  createFacePlanes() {
    const planeGeometry = new PlaneGeometry(0.4, 0.4);
    const planeMaterial = new MeshStandardMaterial({
      side: DoubleSide,
      transparent: true,
      opacity: 1,
      roughness: 1
    });

    const plane1 = new Mesh(planeGeometry, planeMaterial);
    const plane2 = new Mesh(planeGeometry, planeMaterial);
    // plane1.userData.name = 'character';
    // plane2.userData.name = 'character';
    plane1.name = 'character';
    plane2.name = 'character';
    return { plane1, plane2 };
  }

  setPosition(axis, value) {
    this.mesh.position[axis] = value;
  }

  update(delta) {
    if (this.mixer) {
      this.mixer.update(delta);
    }
  }

  run() {
    if (this.actions[0] && this.actions[1]) {
      this.actions[0].fadeOut(0.3);
      this.actions[1].reset().fadeIn(0.3).play();
    }
  }

  idle() {
    if (this.actions[0] && this.actions[1]) {
      this.actions[1].fadeOut(0.3);
      this.actions[0].reset().fadeIn(0.3).play();
    }
  }

  jump() {
    gsap.to(this.mesh.position, {
      y: 1.5,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.to(this.mesh.position, {
          y: 0.55,
          duration: 0.5,
          ease: 'power2.inOut'
        });
      }
    });
  }

  async setFaceTexture() {
    const textureLoader = new TextureLoader();
    
    try {
      const response = await fetch('https://photo-upload-test.onrender.com/api/photos');

      const data = await response.json();
      const latestPhoto = data.photos[data.photos.length - 1];
      const texture = textureLoader.load(`https://photo-upload-test.onrender.com/uploads/${latestPhoto}`);
      this.plane1.material.map = texture;
      this.plane2.material.map = texture;
    } catch (error) {
      console.error(error);
    }

  }
}