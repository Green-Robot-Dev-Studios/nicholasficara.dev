import * as THREE from "three";
import { Text } from 'https://cdn.jsdelivr.net/npm/troika-three-text@0.47.1/+esm'

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { SphereGeometry } from "three";

const init = (game) => {
    game.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById("c") });
    game.renderer.setPixelRatio(window.devicePixelRatio);
    game.renderer.setSize(window.innerWidth, window.innerHeight);
    game.renderer.toneMapping = THREE.ReinhardToneMapping;

    game.scene = new THREE.Scene();

    game.camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        100
    );
    game.camera.position.set(0, 0, 20);
    game.camera.lookAt(new THREE.Vector3(0, 0, 0));
    game.scene.add(game.camera);

    game.controls = new OrbitControls(game.camera, game.renderer.domElement);
    game.controls.maxPolarAngle = Math.PI * 0.5;
    game.controls.minDistance = 1;
    game.controls.maxDistance = 10;

    game.scene.add(new THREE.AmbientLight(0x404040));

    const pointLight = new THREE.PointLight(0xffffff, 1);
    game.camera.add(pointLight);

    const renderScene = new RenderPass(game.scene, game.camera);

    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5,
        0.4,
        0.85
    );
    bloomPass.threshold = 0;
    bloomPass.strength = 1.5;
    bloomPass.radius = 0;

    game.composer = new EffectComposer(game.renderer);
    game.composer.addPass(renderScene);
    game.composer.addPass(bloomPass);

    game.sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0xff0000 })
    );
    game.sphere.velocity = 0;
    game.scene.add(game.sphere);
        
    const myText = new Text()
    game.scene.add(myText)
    myText.text = 'Hi!'
    myText.fontSize = 1
    myText.position.y = 5;
    myText.color = 0xffffff
    myText.anchorX = 'center'
    myText.sync()

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10),
        new THREE.MeshStandardMaterial({ color: 0x0f0f0f })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -10;
    game.scene.add(plane);

    window.addEventListener("resize", onWindowResize);
}

const onWindowResize = (game) => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    game.camera.aspect = width / height;
    game.camera.updateProjectionMatrix();

    game.renderer.setSize(width, height);
    game.composer.setSize(width, height);
}

const infinity = (game, delta) => {
    let radius = 2;
    let speed = 180;
    game.sphere.position.x = ((Math.cos(((delta * speed)) * Math.PI / 180 + Math.PI / 2)) * (radius * 2));
    game.sphere.position.y =  ((Math.sin(((delta * speed)) * Math.PI / 90)) * radius);
}

const animate = (game, timestamp) => {
    requestAnimationFrame((timestamp) => animate(game, timestamp));
    if (game.start === undefined) game.start = timestamp;
    const delta = (timestamp - game.start) / 1000; // seconds

    infinity(game, delta);
  
    game.composer.render();
}

const run = () => {
    let game = { frame: 0 };

    init(game);
    requestAnimationFrame((timestamp) => animate(game, timestamp));
}
run();