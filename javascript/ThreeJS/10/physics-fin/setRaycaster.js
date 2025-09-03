import { Vector2, Raycaster } from 'three';

export default function setRaycaster({ scene, camera, eventObject, onClick }) {
  const raycaster = new Raycaster();
  const mouse = new Vector2();
  let isDragging = false;

  eventObject.addEventListener('mousedown', () => isDragging = false);
  eventObject.addEventListener('mousemove', () => isDragging = true);
  eventObject.addEventListener('click', e => {
    if (isDragging) return;

    mouse.x = e.clientX / window.innerWidth * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);
    for (const item of intersects) {
      if (item.object.isMesh) {
        if (onClick) onClick(item.object);
        break;
      }
    }
  });
}