import {
  BoxGeometry,
  MeshStandardMaterial,
  Mesh
} from 'three';

export default class Road {
  constructor(scene, roadLength) {
    const roadMesh = new Mesh(
      new BoxGeometry(20, 0.1, roadLength),
      new MeshStandardMaterial({
        color: '#aaa'
      })
    );
    roadMesh.position.set(0, -0.05, -(roadLength / 2));
    roadMesh.receiveShadow = true;
    scene.add(roadMesh);
  }
}