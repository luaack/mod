import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export function createStudio({ width, height }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.setSize(width, height);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.45;

  const camera = new THREE.PerspectiveCamera(26, width / height, 0.1, 400);

  const hemi = new THREE.HemisphereLight('#ffffff', '#c7bcab', 0.8);
  scene.add(hemi);

  const key = new THREE.DirectionalLight('#fff8ee', 2.9);
  key.position.set(-6, 11, 8);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -9;
  key.shadow.camera.right = 9;
  key.shadow.camera.top = 9;
  key.shadow.camera.bottom = -9;
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 40;
  key.shadow.radius = 7;
  key.shadow.blurSamples = 20;
  key.shadow.bias = -0.0004;
  scene.add(key);
  scene.add(key.target);

  const fill = new THREE.DirectionalLight('#ffeedd', 0.45);
  fill.position.set(8, 5, 6);
  scene.add(fill);

  return { renderer, scene, camera, key, fill, hemi, width, height, render: () => renderer.render(scene, camera) };
}
