import {
  Vector3,
  CanvasTexture,
  MeshBasicMaterial,
  DoubleSide,
  PlaneGeometry,
  Mesh
} from 'three';

export class Decoration {
  constructor({ name, scene, gltfLoader, glbPath, position = new Vector3(0, 0, 0), rotationY = 0, onLoad }) {
    this.mesh = null;
    this.onLoad = onLoad;

    gltfLoader.load(
      glbPath,
      glb => {
        glb.scene.traverse(child => {
          if (child.isMesh) {
            child.castShadow = true;
            // child.userData.name = name;
            child.name = name;
          }
        });

        this.mesh = glb.scene;
        this.mesh.position.copy(position);
        this.mesh.rotation.y = rotationY;
        scene.add(this.mesh);
        // if (onLoad) onLoad.bind(this)();
        if (this.onLoad) this.onLoad();
      }
    );
  }
}

export class DisplayBoard extends Decoration {
  constructor({ name, scene, gltfLoader, glbPath, position = new Vector3(0, 0, 0), rotationY = 0, onLoad }) {
    super({
      name,
      scene,
      gltfLoader,
      glbPath,
      position,
      rotationY,
      onLoad() {
        this.createCanvas();
        this.loadRandomDogImage();
        if (onLoad) onLoad();
      }
    });

    this.canvas = null;
    this.ctx = null;
    this.image = null;
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 512;
    this.canvas.height = 512;
    this.ctx = this.canvas.getContext('2d');

    // 캔버스 머티리얼 생성
    const texture = new CanvasTexture(this.canvas);
    const material = new MeshBasicMaterial({
      map: texture,
      side: DoubleSide
    });

    // 디스플레이 보드에 평면 추가
    const plane = new Mesh(
      new PlaneGeometry(1.95, 1.95),
      material
    );
    // plane.userData.name = 'displayBoard';
    plane.name = 'displayBoard';
    plane.position.set(-1.21, 0.78, 0.08);
    this.plane = plane;
    
    this.mesh.add(plane);
  }

  drawImage() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const aspectRatio = this.image.width / this.image.height;
    let drawWidth = this.canvas.width;
    let drawHeight = this.canvas.height;

    if (aspectRatio > 1) {
      // 가로형
      drawHeight = drawWidth / aspectRatio;
    } else {
      // 세로형
      drawWidth = drawHeight * aspectRatio;
    }

    const x = (this.canvas.width - drawWidth) / 2;
    const y = (this.canvas.height - drawHeight) / 2;

    this.ctx.drawImage(this.image, x, y, drawWidth, drawHeight);

    // 텍스트 스타일 설정
    this.ctx.font = 'bold 48px Arial';
    this.ctx.fillStyle = 'white';
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 8;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'bottom';

    // 강아지 이름 추출 (URL에서)
    // console.log(this.image.src)
    const breedName = this.image.src.split('/breeds/')[1]?.split('/')[0] || 'Dog';
    // 이런거 할 때 직접도 해보고 ai한테 시켜도 보기
    const displayName = breedName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // 텍스트 그림자 효과
    this.ctx.strokeText(displayName, this.canvas.width / 2, this.canvas.height - 20);
    this.ctx.fillText(displayName, this.canvas.width / 2, this.canvas.height - 20);

    this.ctx.textAlign = 'left';
    this.ctx.font = 'bold 24px Arial';
    this.ctx.lineWidth = 4;
    this.ctx.save();
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.rotate(-20 * Math.PI / 180);
    this.ctx.translate(-this.canvas.width / 2, -this.canvas.height / 2);
    this.ctx.strokeText('RANDOM DOG', 100, 30);
    this.ctx.fillText('RANDOM DOG', 100, 30);
    this.ctx.restore();
    
    // 텍스처 업데이트
    // if (this.object) {
      // this.object.traverse((child) => {
        // if (child.isMesh && child.material.map) {
          // child.material.map.needsUpdate = true;
        // }
      // });
    // }
    this.plane.material.map.needsUpdate = true;
  }

  async loadRandomDogImage() {
    console.log('loadr')
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();

      if (data.status === 'success') {
        this.image = new Image();
        this.image.crossOrigin = 'anonymous';
        console.log(data.message);
        this.image.src = data.message;
        this.image.onload = () => {
          this.drawImage();
        };
      }
    } catch (error) {
      console.error(error);
    }
  }
}