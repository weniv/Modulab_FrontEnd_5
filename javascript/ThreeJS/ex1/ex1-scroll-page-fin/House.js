import { Group, Box3, Vector3, PointLight } from 'three';

export class House {
	constructor({ name, gltfLoader, scene, modelSrc, x, z, height = 2, scale = 1 }) {
		this.x = x;
		this.z = z;
		const houseLight = new PointLight('white', 10);

		gltfLoader.load(
			modelSrc,
			glb => {
				// 그림자
				glb.scene.traverse(child => {
					if (child.isMesh) {
						child.castShadow = true;
					}
				});

				// 중심점 조정을 위한 컨테이너 생성
				// const container = new Group();
				
				// 바운딩 박스로 중심점 계산
				// const box = new Box3().setFromObject(glb.scene);
				// const center = box.getCenter(new Vector3());
				
				// GLB를 중심점 기준으로 정렬
				// glb.scene.position.copy(center).multiplyScalar(-1);
				// container.add(glb.scene);
				// container.position.set(x, height/2, z);

				const mesh = glb.scene;
				// mesh.castShadow = true; // glb 파일은 이렇게 하면 99.9999% 그림자 안생김
				mesh.position.set(x, height/2, z);
				mesh.scale.set(scale, scale, scale);
				scene.add(mesh);

				houseLight.position.set(x, height, z);
				scene.add(houseLight);
			}
		);
	}
}