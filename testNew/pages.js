import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
import { DeviceOrientationControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/DeviceOrientationControls.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";

let camera, scene, renderer, controls, controls2;

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", function () {
  init();
  animate();
});

function init() {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1100
  );

  // var dummy = new THREE.Object3D();
  // scene.add(dummy);
  // dummy.add(camera);

  controls2 = new DeviceOrientationControls(camera);
  // controls = new OrbitControls(camera, renderer.domElement); // manual drag, manual zoom, ...
  //controls = new DeviceOrientationControls(camera);
  
  // camera.position.set(0, 20, 100);
  // controls.update();
  controls2.update();

  const geometry = new THREE.SphereGeometry(500, 60, 40);
  // invert the geometry on the x-axis so that all of the faces point inward
  geometry.scale(-1, 1, 1);

  const material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("./a.jpg"),
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const helperGeometry = new THREE.BoxGeometry(100, 100, 100, 4, 4, 4);
  const helperMaterial = new THREE.MeshBasicMaterial({
    color: 0xff00ff,
    wireframe: true,
  });
  const helper = new THREE.Mesh(helperGeometry, helperMaterial);
  scene.add(helper);

  //

  // renderer = new THREE.WebGLRenderer({ antialias: true });
  // renderer.setPixelRatio(window.devicePixelRatio);
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  //

  window.addEventListener("resize", onWindowResize);
}

function animate() {
  window.requestAnimationFrame(animate);

  //controls.update();
  controls2.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
